import path from "path";
import { ISimplePost } from "./simple-post.types";
import { ISimplePostOptions } from "./vite-plugin.types";
import { ResolvedConfig } from "vite";
import { writeFileSync } from "fs";
import { Feed } from "feed";

export default function GenerateRSS(config: ResolvedConfig, options: ISimplePostOptions, content: ISimplePost[]) {

    // set defaults for empty options
    const {
        outputDir = path.join(config.root, '/public'),
        pretty = false,
        rssFileName = 'rss.xml',
        rssLength = 20,
        rootUrl
    } = options;

    const feed = new Feed({
        title: 'My Blog',
        id: rootUrl,
        link: rootUrl,
        image: `${rootUrl}/favicon.ico`,
        docs: 'http://example.com/rss/docs.html',
        copyright: `${new Date().getFullYear()} Spencer Sokol`,
        updated: new Date(Date.now()),
        language: 'en',
        feedLinks: {
            rss: `${rootUrl}/${rssFileName}`
        }
    });

    // TODO: filter properly
    const filteredContent = [ ...content ];

    console.log('Generating RSS...');

    for (let i = 0; i < rssLength && i < filteredContent.length; i++) {
        
        const item = filteredContent[i];
        const permalink = `${rootUrl}/${item.type}/${item.slug}/`; // TODO generate properly

        console.log(`Adding post ${permalink}`);

        feed.addItem({
            title: item.title,
            description: item.content,
            date: item.date,
            link: permalink,
            author: [{
                name: 'Spencer Sokol'
            }]
        });
    }

    const xml = feed.rss2();

    writeFileSync(`${outputDir}/${rssFileName}`, (pretty) ? xml : xml);
    
}