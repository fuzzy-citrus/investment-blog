import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		cardDesc: z.string().optional(),
			noteUrl: z.string().url().optional(),
			related: z.array(z.string()).optional(),
			draft: z.boolean().optional(),
			stockCard: z.object({
				ticker: z.string(),
				companyName: z.string(),
				// ウォッチリスト用の短縮表示名（未指定なら companyName を表示）
				shortName: z.string().optional(),
				// バリュー商会評価ランク。ホームのウォッチリストはここから自動生成（draft除外・ランク順）
				rating: z.enum(['A++', 'A+', 'A', 'A-', 'B++', 'B+', 'B']).optional(),
				currentPrice: z.number(),
				targetPrice: z.number(),
				upside: z.string(),
				downside: z.string(),
				modifiedPBR: z.string(),
				delistProb: z.string().optional(),
				category: z.string(),
				cardTheme: z.string().optional(),
			}).optional(),
		}),
});

export const collections = { blog };
