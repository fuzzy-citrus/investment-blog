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
			stockCard: z.object({
				ticker: z.string(),
				companyName: z.string(),
				currentPrice: z.number(),
				targetPrice: z.number(),
				upside: z.string(),
				downside: z.string(),
				modifiedPBR: z.string(),
				delistProb: z.string().optional(),
				category: z.string(),
			}).optional(),
		}),
});

export const collections = { blog };
