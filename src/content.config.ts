// 1. Import utilities from `astro:content`
import {defineCollection, reference} from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

// 4. Define your collection(s)
const blog = defineCollection({
    // type: 'content',
    loader: glob({pattern: ['*.md','*.mdx'], base: './src/data/posts'}),
    schema: ({image}) =>  z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
        image: image(),
        // author: z.string(),
        author: reference('authors'),
        tags: z.array(z.string()),
        isDraft: z.boolean().default(false)
    })
});

const authors = defineCollection({
    loader: glob({pattern: ['*.json','*.yml'], base: './src/data/author'}),
    schema: ({image}) => z.object({
        name: z.string(),
        avatar: image()
    })
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { blog,authors };