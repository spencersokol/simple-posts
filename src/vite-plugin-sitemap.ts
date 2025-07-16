import { ResolvedConfig } from "vite";
import { ISimplePost } from "./simple-post.types";
import { ISimplePostOptions } from "./vite-plugin.types";
import path from "path";
import { writeFileSync } from "fs";

export default function GenerateSitemap(config: ResolvedConfig, options: ISimplePostOptions, content: ISimplePost[]) {

    // set defaults for empty options
    const {
        outputDir = path.join(config.root, '/public'),
        pretty = false,
        sitemapFileName = 'rss.xml'
    } = options;

    let xml = '';

    writeFileSync(`${outputDir}/${sitemapFileName}`, (pretty) ? JSON.stringify(xml, null, 4) : JSON.stringify(xml));
    
}