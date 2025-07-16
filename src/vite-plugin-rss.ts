import path from "path";
import { ISimplePost } from "./simple-post.types";
import { ISimplePostOptions } from "./vite-plugin.types";
import { ResolvedConfig } from "vite";
import { writeFileSync } from "fs";
import RSS from "rss";

export default function GenerateRSS(config: ResolvedConfig, options: ISimplePostOptions, content: ISimplePost[]) {

    // set defaults for empty options
    const {
        outputDir = path.join(config.root, '/public'),
        pretty = false,
        rssFileName = 'rss.xml',
        rssLength = 20,
        rootUrl
    } = options;

    const feed = new RSS({
        title: 'My Blog',
        feed_url: `${rootUrl}/${rssFileName}`,
        site_url: rootUrl,
        image_url: `${rootUrl}/favicon.ico`,
        docs: 'http://example.com/rss/docs.html',
        managingEditor: 'Spencer Sokol',
        webMaster: 'Spencer Sokol',
        copyright: `${new Date().getFullYear()} Spencer Sokol`,
        pubDate: `${new Date().toLocaleDateString()}`,
        language: 'en',
    });

    // TODO: filter properly
    const filteredContent = content.filter(item => 'post' == item.type);

    for (let i = 0; i < rssLength && i < filteredContent.length; i++) {
        const item = filteredContent[i];
        feed.item({
            title: item.title,
            description: item.description,
            date: item.date,
            url: `${rootUrl}/blog/${item.slug}/` // TODO generate properly
        });
    }

    const xml = feed.xml();

    writeFileSync(`${outputDir}/${rssFileName}`, (pretty) ? JSON.stringify(xml, null, 4) : JSON.stringify(xml));
    
}