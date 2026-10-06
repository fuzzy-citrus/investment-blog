// 完全版レポート（dist/analysis/*.html）に、サイトへ戻る道と検索エンジン向けの情報を差し込む。
//
// なぜ要るか：完全版は単体のHTMLで、サイトのメニューも、サイト内へのリンクも、説明文も、
// 正規URLの指定も持っていなかった。サイトマップの4分の1を占めるページが「どこにも繋がって
// いない単独ページ」に見えていた（2026-10-07、AdSense「有用性の低いコンテンツ」対策）。
//
// やること（public/ の元ファイルは触らない。ビルド後の dist/ だけを書き換える）
//   1. <head> に canonical と meta description（無いときだけ）
//   2. <body> の先頭に、ホーム／元の記事／レポート一覧へのリンク帯
//   3. </body> の手前に、運営者情報とプライバシーポリシーへのリンク
//   4. どの公開記事からも参照されていないレポートには noindex
// 何度実行しても二重に入らない（目印 data-nb-sitebar を見る）。
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://numasoko-value.com';
const BLOG_DIR = './src/content/blog';
const OUT_DIR = './dist/analysis';

if (!existsSync(OUT_DIR)) {
	console.log('[postbuild-analysis] dist/analysis がありません。何もしません。');
	process.exit(0);
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// 公開記事 → 参照している完全版のスラッグ。noteUrl で指している記事を優先する
const owner = new Map();
for (const file of readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))) {
	const src = readFileSync(join(BLOG_DIR, file), 'utf8');
	const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!fm || /^draft:\s*true\s*$/m.test(fm[1])) continue;
	const slug = file.replace(/\.md$/, '');
	const title = (fm[1].match(/^title:\s*"(.*)"\s*$/m) || [])[1] || slug;
	const description = (fm[1].match(/^description:\s*"(.*)"\s*$/m) || [])[1] || '';
	const note = (fm[1].match(/^noteUrl:\s*"[^"]*\/analysis\/([A-Za-z0-9_-]+)/m) || [])[1];
	const refs = new Set([...src.matchAll(/\/analysis\/([A-Za-z0-9_-]+)/g)].map((m) => m[1]));
	for (const r of refs) {
		const cur = owner.get(r);
		const primary = r === note;
		if (!cur || (primary && !cur.primary)) owner.set(r, { slug, title, description, primary });
	}
}

const BAR_STYLE =
	'font:500 13px/1.5 system-ui,-apple-system,Hiragino Sans,Yu Gothic,Meiryo,sans-serif;' + // style属性の中なので " は使わない
	'background:#16211c;color:#e9efe9;padding:9px 14px;display:flex;flex-wrap:wrap;gap:6px 18px;align-items:center';
const LINK_STYLE = 'color:#e9efe9;text-decoration:underline;text-underline-offset:3px';

let done = 0;
let skipped = 0;
let orphan = 0;
// index.html はサイトのメニューを持つ一覧ページ（Astro製）なので対象外
for (const file of readdirSync(OUT_DIR).filter((f) => f.endsWith('.html') && f !== 'index.html')) {
	const path = join(OUT_DIR, file);
	let html = readFileSync(path, 'utf8');
	if (html.includes('data-nb-sitebar')) {
		skipped++;
		continue;
	}
	if (!/<\/head>/i.test(html) || !/<body[^>]*>/i.test(html)) {
		console.log(`[postbuild-analysis] 構造が読めないので飛ばします: ${file}`);
		continue;
	}
	const slug = file.replace(/\.html$/, '');
	const art = owner.get(slug);
	const pageTitle = ((html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || slug).replace(/\s+/g, ' ').trim();

	// 1. head
	const head = [];
	if (!/rel=["']canonical["']/i.test(html)) head.push(`<link rel="canonical" href="${SITE}/analysis/${slug}">`);
	if (!/<meta\s+name=["']description["']/i.test(html)) {
		const base = art?.description || `${pageTitle}。沼底バリュー商会の完全版レポートです。`;
		const desc = base.length > 140 ? base.slice(0, 139) + '…' : base;
		head.push(`<meta name="description" content="${esc(desc)}">`);
	}
	if (!art && !/<meta\s+name=["']robots["']/i.test(html)) {
		head.push('<meta name="robots" content="noindex, follow">');
		orphan++;
	}
	if (head.length) html = html.replace(/<\/head>/i, head.join('\n') + '\n</head>');

	// 2. 先頭の帯
	const articleLink = art
		? `<a href="/blog/${art.slug}/" style="${LINK_STYLE}">この資料の解説記事を読む</a>`
		: '';
	const top =
		`\n<nav data-nb-sitebar data-pagefind-ignore aria-label="サイト内の移動" style="${BAR_STYLE}">` +
		`<a href="/" style="${LINK_STYLE};font-weight:700;text-decoration:none">沼底バリュー商会</a>` +
		`<a href="/" style="${LINK_STYLE}">ホーム</a>` +
		articleLink +
		`<a href="/analysis/" style="${LINK_STYLE}">完全版レポート一覧</a>` +
		`<a href="/blog/" style="${LINK_STYLE}">記事一覧</a>` +
		`</nav>\n`;
	html = html.replace(/<body[^>]*>/i, (m) => m + top);

	// 3. 末尾
	const bottom =
		`\n<div data-nb-sitebar data-pagefind-ignore style="${BAR_STYLE};justify-content:center;font-size:12px">` +
		`<span>© 沼底バリュー商会</span>` +
		`<a href="/about/#owner-info" style="${LINK_STYLE}">運営者情報・免責事項</a>` +
		`<a href="/privacy/" style="${LINK_STYLE}">プライバシーポリシー</a>` +
		`<a href="/" style="${LINK_STYLE}">ホームへ戻る</a>` +
		`</div>\n`;
	html = html.replace(/<\/body>/i, bottom + '</body>');

	writeFileSync(path, html);
	done++;
}
console.log(`[postbuild-analysis] 完全版レポート ${done}本に差し込み（処理済み${skipped}本・参照のない${orphan}本は noindex）`);

// ── サイト内リンクを「転送されないURL」に揃える ─────────────────────
// Cloudflare Pages は /about を /about/ へ、/analysis/x.html を /analysis/x へ 308 で転送する。
// サイト内のリンクが転送元を指していると、Search Console に「ページにリダイレクトがあります」が
// リンクの数だけ積み上がる（2026-10-07 時点で41件）。ビルド後の全HTMLで、リンク先を転送後の形に直す。
//   /about            → /about/            （拡張子のないパスは末尾スラッシュ付きが正）
//   /about#owner-info → /about/#owner-info
//   /analysis/x.html  → /analysis/x        （完全版は拡張子なし・スラッシュなしが正）
//   /holdings.html    → /holdings
const DIST = './dist';
const ORIGIN = 'https://numasoko-value\.com';
const HREF = new RegExp(`href="(${ORIGIN})?(/[^"#?]*)([#?][^"]*)?"`, 'g');

function normalizePath(path) {
	const rep = path.match(/^\/analysis\/([^/.]+)\.html$/);
	if (rep) return `/analysis/${rep[1]}`;
	if (path === '/holdings.html') return '/holdings';
	if (path === '/' || path.endsWith('/')) return path;
	if (/^\/analysis\/[^/]+$/.test(path) || path === '/holdings') return path; // これが正の形
	const last = path.slice(path.lastIndexOf('/') + 1);
	if (last.includes('.')) return path; // ファイル（.css .png .xml など）
	return path + '/';
}

function walk(dir, out = []) {
	for (const e of readdirSync(dir, { withFileTypes: true })) {
		const p = join(dir, e.name);
		if (e.isDirectory()) {
			if (e.name === '_astro' || e.name === 'pagefind') continue;
			walk(p, out);
		} else if (e.name.endsWith('.html')) out.push(p);
	}
	return out;
}

let files = 0;
let links = 0;
for (const f of walk(DIST)) {
	const src = readFileSync(f, 'utf8');
	let n = 0;
	const next = src.replace(HREF, (m, origin, path, tail) => {
		const fixed = normalizePath(path);
		if (fixed === path) return m;
		n++;
		return `href="${origin || ''}${fixed}${tail || ''}"`;
	});
	if (n) {
		writeFileSync(f, next);
		files++;
		links += n;
	}
}
console.log(`[postbuild-analysis] サイト内リンク ${links}か所を転送されない形に直しました（${files}ファイル）`);
