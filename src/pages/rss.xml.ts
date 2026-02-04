import type {APIRoute} from "astro";
import rss from '@astrojs/rss';
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import {getCollection} from "astro:content";

const parser = new MarkdownIt();

export const GET = (async ({params, request, site, url}) => {
    const blogPost = await getCollection('blog')
    return rss({
        // stylesheet: '/assets/styles/rss.xsl',
        // `<title>` field in output xml
        title: `Santiago's Blog`,
        // `<description>` field in output xml
        xmlns: {
            media: 'http://search.yahoo.com/mrss/',
        },
        description: 'A humble Astronaut’s guide to the stars',
        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#site
        site: site ?? url.origin,
        // Array of `<item>`s in output xml
        // See "Generating items" section for examples using content collections and glob imports
        items: blogPost.map(({data, body, id}) => ({
            title: data.title,
            description: data.description,
            pubDate: data.date,
            link: `posts/${id}`,
            content: sanitizeHtml(parser.render(body!), {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
            }),

            customData: `<media:content type="image/${data.image.format === 'jpg' ? 'jpeg' : 'png'}" width="${data.image.width}" height="${data.image.height}" medium="image" url="${site + data.image.src}" />`,
        })),
        // (optional) inject custom xml
        // customData: `<language>en-us</language>`,

    });
}) satisfies APIRoute;