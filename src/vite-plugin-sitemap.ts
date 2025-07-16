import { ResolvedConfig } from "vite";
import { ISimplePost } from "./simple-post.types";
import { ISimplePostOptions } from "./vite-plugin.types";
import path from "path";
import { createWriteStream } from "fs";
import { SitemapStream } from 'sitemap';

export default function GenerateSitemap(config: ResolvedConfig, options: ISimplePostOptions, content: ISimplePost[]) {

    // set defaults for empty options
    const {
        outputDir = path.join(config.root, '/public'),
        additionalPostTypes : postTypes = [],
        sitemapFileName = 'sitemap.xml',
        rootUrl
    } = options;

    const postTypePrefixes : Record<string, string> = {};

    // Creates a sitemap object given the input configuration with URLs
    const sitemap = new SitemapStream({ hostname: rootUrl });

    const writeStream = createWriteStream(path.join(outputDir, sitemapFileName));
    sitemap.pipe(writeStream);

    for (let i = 0; i < content.length; i++) {
        
        const item = content[i];

        if (!postTypePrefixes.keys?.includes(item.type)) {
            const type = postTypes.find((type) => type.name === item.type);
            if (!type)
                continue;
            postTypePrefixes[item.type] = type.prefix;
        }
        
        const prefix = postTypePrefixes[item.type] ? '/' + postTypePrefixes[item.type] : '';
        const permalink = `${prefix}/${item.slug}/`;

        sitemap.write(permalink);

    }

    sitemap.end();

    console.log(`Generated sitemap.`);
    console.log(path.join(outputDir, sitemapFileName));

    //writeFileSync(path.join(outputDir, sitemapFileName), xml);
    
}