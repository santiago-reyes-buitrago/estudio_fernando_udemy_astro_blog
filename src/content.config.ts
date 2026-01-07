// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

// 4. Define your collection(s)
const blog = defineCollection({
    // type: 'content',
    loader: glob({pattern: ['*.md','*.mdx'], base: './src/data/posts'}),
    schema: z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
        image: z.string(),

        author: z.string(),
        tags: z.array(z.string())
    })
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { blog };