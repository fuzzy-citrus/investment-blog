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

// https://astro.build/config
export default defineConfig({
	site: SITE,
	integrations: [mdx(), sitemap({ customPages })],
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
