import type { APIRoute } from "astro";
import rss from '@astrojs/rss';
import {getCollection} from "astro:content";

export const GET = ( async ({ params, request,site,url }) => {
    const blogPost = await getCollection('blog')
    return rss({
        stylesheet: '/assets/styles/rss.xsl',
        // `<title>` field in output xml
        title: `Santiago's Blog`,
        // `<description>` field in output xml
        description: 'A humble Astronaut’s guide to the stars',
        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#site
        site: url.origin,
        // Array of `<item>`s in output xml
        // See "Generating items" section for examples using content collections and glob imports
        items: blogPost.map((item) => ({
            title: item.data.title,
            description: item.data.description,
            pubDate: item.data.date,
            link: `posts/${item.id}`
        })),
        // (optional) inject custom xml
        customData: `<language>en-us</language>`,

    });
}) satisfies APIRoute;