import { castPortraits } from './src/data/castPortraits.mjs';
import {
	sceneArt,
	SCENE_WIDTH,
	SCENE_HEIGHT,
	SCENE_MAX_PER_POST,
	SCENE_MIN_GAP,
	SCENE_MIN_HEADINGS,
} from './src/data/sceneArt.mjs';
// @ts-check

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

const SITE = 'https://numasoko-value.com';

// 完全版レポート（public/analysis/*.html）は Astro生成ページではないため
// sitemap が自動収集しない。公開記事（draft:false）が noteUrl または本文リンクで
// 参照している完全版HTMLだけを、正規URL（拡張子なし＝308正規化先）で追加する。
// → draft在庫の完全版HTMLは公開日まで自動除外／どの公開記事からも参照のない
//   孤立HTMLも除外（＝重複・孤立ページのインデックス回避）。新記事の公開で自動追随。
const BLOG_DIR = './src/content/blog';
const ANALYSIS_DIR = './public/analysis';

// 実在する完全版HTMLのスラッグ集合（存在しないリンク先を載せない安全網）
const existingReports = new Set(
	readdirSync(ANALYSIS_DIR)
		.filter((f) => f.endsWith('.html'))
		.map((f) => f.replace(/\.html$/, '')),
);

const analysisSlugs = new Set();
for (const file of readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))) {
	const src = readFileSync(join(BLOG_DIR, file), 'utf8');
	const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (fm && /^draft:\s*true\s*$/m.test(fm[1])) continue; // 下書きは除外
	// noteUrl（フル）と本文の相対リンク（/analysis/xxx）の両方を拾う
	for (const m of src.matchAll(/\/analysis\/([A-Za-z0-9-]+)/g)) {
		if (existingReports.has(m[1])) analysisSlugs.add(m[1]);
	}
}
const customPages = [
	...[...analysisSlugs].sort().map((s) => `${SITE}/analysis/${s}`),
	`${SITE}/holdings`, // 保有総括ページ（public/holdings.html）
];


// ── 会話行にキャラの顔アイコンを差し込む ─────────────────────────
// 記事本文は書き換えず、ビルド時に「絵文字＋<strong>名前</strong>「…」」の段落を
// <img class="speaker-icon"> 付きに変換する。画像のない脇役（野村・教祖・小猿など）は
// 絵文字のまま残す。名前の表記ゆれ（日向（見習い）など）もここで吸収する。
const SPEAKER_ICONS = {
	沼田: 'numata',
	野村: 'nomura',
	夜見: 'yomi',
	守田: 'morita',
	日向: 'hinata',
	'日向（見習い）': 'hinata',
	河内: 'kawachi',
	待伏: 'machibuse',
	堀田: 'hotta',
	墨田: 'sumida',
	花岡: 'hanaoka',
	優田: 'yuda',
	鸚鵡: 'orukan-oumu',
	オルカン鸚鵡: 'orukan-oumu',
	テック番長: 'tech-bancho',
	番長: 'tech-bancho',
	レバナス小猿: 'rebanas-kozaru',
	小猿: 'rebanas-kozaru',
	オルカン教祖: 'zensekai-bouzu',
	教祖: 'zensekai-bouzu',
	全世界坊主: 'zensekai-bouzu',
	ドル建て鷹: 'dollar-taka',
	鷹: 'dollar-taka',
	積立ひつじ: 'tsumitate-hitsuji',
	ひつじ: 'tsumitate-hitsuji',
};

// 名前を書かずに「絵文字＋鉤括弧」だけで話す行が1000行以上ある。
// 絵文字は1人に1つなので、ここから引ければ名前の表記ゆれ（野村（電話越し）など）も拾える。
const EMOJI_SPEAKERS = {
	'🧑‍💼': 'numata', '🧓': 'nomura', '🦉': 'yomi', '🦞': 'morita', '🦎': 'hinata',
	'🦦': 'kawachi', '🐊': 'machibuse', '🦫': 'hotta', '🦑': 'sumida', '🐝': 'hanaoka',
	'🦩': 'yuda', '🦍': 'tech-bancho', '🐒': 'rebanas-kozaru', '🧘': 'zensekai-bouzu',
	'🦜': 'orukan-oumu', '🦅': 'dollar-taka', '🐑': 'tsumitate-hitsuji',
};
// 長いもの（🧑‍💼のようなZWJ連結）から先に照合する
const EMOJI_KEYS = Object.keys(EMOJI_SPEAKERS).sort((a, b) => b.length - a.length);
const RIVALS = new Set(['tech-bancho', 'rebanas-kozaru', 'zensekai-bouzu', 'orukan-oumu', 'dollar-taka', 'tsumitate-hitsuji']);

// 先頭の絵文字から話者を引く（異体字セレクタは落とす）
function speakerByEmoji(lead) {
	const s = lead.replace(/[︎️]/g, '').trim();
	for (const k of EMOJI_KEYS) {
		if (s.startsWith(k.replace(/[︎️]/g, ''))) return EMOJI_SPEAKERS[k];
	}
	return null;
}

// 絵文字だけの短い文字列か（日本語・英数字・鉤括弧を含まない）
const EMOJI_ONLY = /^[^぀-ヿ一-鿿A-Za-z0-9「」]+$/;

// 名前のない行（🦎「……」）を、絵文字と本文に切り分けてから通常の処理に渡す
function splitNamelessSay(node) {
	const kids = node.children;
	if (!kids || kids.length === 0) return;
	const lead = kids[0];
	if (lead.type !== 'text') return;
	const m = lead.value.match(/^(\s*)([^「\s]{1,6}?)(?=「)/);
	if (!m || !EMOJI_ONLY.test(m[2])) return;
	if (!speakerByEmoji(m[2])) return;
	kids[0] = { type: 'text', value: lead.value.slice(m[0].length) };
	kids.unshift({ type: 'text', value: m[2] });
}

function decorateSpeaker(node) {
	splitNamelessSay(node);
	const kids = node.children;
	if (!kids || kids.length < 2) return;
	const lead = kids[0];
	if (lead.type !== 'text' || !lead.value.trim() || !EMOJI_ONLY.test(lead.value.trim())) return;
	// ① **名前** と書かれた記事 … <strong>要素として届く
	// ② <strong>名前</strong> と直接書かれた記事 … raw ノードとして届く
	//   （太字の事故対策でHTMLに置き換えた記事があるため、両方拾う）
	let name = null;
	const strong = kids[1];
	if (strong && strong.type === 'element' && strong.tagName === 'strong') {
		name = strong.children?.[0]?.value?.trim();
	} else if (strong && strong.type === 'raw' && strong.value.startsWith('<strong>')) {
		const inline = strong.value.slice('<strong>'.length);
		name = (inline || kids[2]?.value || '').replace('</strong>', '').trim();
	}
	// 名前が引けないとき（名前なしの行・野村（電話越し）のような表記ゆれ）は絵文字で引く
	const id = (name && SPEAKER_ICONS[name]) || speakerByEmoji(lead.value);
	if (!id) return;
	const art = castPortraits[id];
	if (!art) return;
	const body = {
		type: 'element',
		tagName: 'span',
		properties: { className: ['say-body'] },
		children: kids.slice(1),
	};
	node.children = [
		{
			type: 'element', tagName: 'span',
			properties: { className: ['cast-icon', 'speaker-icon'], style: art.cropStyle, ariaHidden: 'true' },
			children: [{
				type: 'element', tagName: 'img',
				properties: { src: art.src, alt: '', width: art.width, height: art.height, loading: 'lazy', decoding: 'async' },
				children: [],
			}],
		}, body,
	];

	node.properties = node.properties || {};
	const cls = node.properties.className || [];
	node.properties.className = [
		...(Array.isArray(cls) ? cls : [cls]), 'say', `say-${id}`,
		...(RIVALS.has(id) ? ['say-rival'] : []),
	];
}

function rehypeSpeakerIcons() {
	return (tree) => {
		const walk = (node) => {
			if (!node.children) return;
			for (const child of node.children) {
				if (child.type === 'element' && child.tagName === 'p') decorateSpeaker(child);
				walk(child);
			}
		};
		walk(tree);
	};
}

// ── 章と章のあいだに場面イラストを差し込む ───────────────────────
// 見出し（h2）の文言に合う絵だけを、記事の前から順に最大3枚。
// 記事のMarkdownは触らない。合う絵がない章には何も入らない。
function nodeText(node) {
	if (node.type === 'text') return node.value;
	if (node.type === 'raw') return node.value.replace(/<[^>]*>/g, '');
	return (node.children || []).map(nodeText).join('');
}

function sceneFigure(scene) {
	return {
		type: 'element', tagName: 'figure',
		properties: { className: ['scene-eyecatch'] },
		children: [
			{
				type: 'element', tagName: 'img',
				properties: {
					src: scene.src, alt: scene.alt,
					width: SCENE_WIDTH, height: SCENE_HEIGHT,
					loading: 'lazy', decoding: 'async',
				},
				children: [],
			},
			{
				type: 'element', tagName: 'figcaption', properties: {},
				children: [{ type: 'text', value: scene.caption }],
			},
		],
	};
}

function rehypeSceneEyecatch() {
	return (tree) => {
		const kids = tree.children;
		const heads = [];
		kids.forEach((n, i) => {
			if (n.type === 'element' && n.tagName === 'h2') heads.push(i);
		});
		if (heads.length < SCENE_MIN_HEADINGS) return;

		const used = new Set();
		const picks = [];
		let last = -99;
		// 最初の見出し（「一言でいうと」など）の前は値札カードが出るので飛ばす
		for (let h = 1; h < heads.length && picks.length < SCENE_MAX_PER_POST; h++) {
			if (h - last <= SCENE_MIN_GAP) continue;
			const text = nodeText(kids[heads[h]]);
			const scene = sceneArt.find((s) => !used.has(s.id) && s.match.test(text));
			if (!scene) continue;
			used.add(scene.id);
			picks.push([heads[h], scene]);
			last = h;
		}
		// 後ろから入れないと位置がずれる
		for (let i = picks.length - 1; i >= 0; i--) {
			kids.splice(picks[i][0], 0, sceneFigure(picks[i][1]));
		}
	};
}

// https://astro.build/config
export default defineConfig({
	site: SITE,
	integrations: [mdx(), sitemap({ customPages })],
	markdown: { rehypePlugins: [rehypeSpeakerIcons, rehypeSceneEyecatch] },
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
