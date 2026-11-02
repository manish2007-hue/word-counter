import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('CleanWordCounter Editorial Team'),
    tags: z.array(z.string()).default([]),
    category: z.string().default('Writing & Academic Guides'),
    readTime: z.string().default('5 min read'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
