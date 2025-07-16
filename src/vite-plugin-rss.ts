import path from "path";
import { ISimplePost } from "./simple-post.types";
import { ISimplePostOptions } from "./vite-plugin.types";
import { ResolvedConfig } from "vite";
import { writeFileSync, writeFile } from "fs";
import { Feed, Item } from "feed";
import Showdown from "showdown";

export default function GenerateRSS(config: ResolvedConfig, options: ISimplePostOptions, content: ISimplePost[]) {

    // set defaults for empty options
    const {
        outputDir = path.join(config.root, '/public'),
        pretty = false,
        additionalPostTypes : postTypes = [],
        rssFileName = 'rss.xml',
        rssLength = 20,
        rssExcludePostTypes,
        rootUrl,
        author,
        siteTitle,
        siteDescription
    } = options;

    const showdown = new Showdown.Converter();

    postTypes.unshift({ name: 'page', directory: 'pages', prefix: ''});
    postTypes.unshift({ name: 'post', directory: 'posts', prefix: 'blog'});
    
    const feed = new Feed({
        title: siteTitle,
        description: siteDescription,
        id: rootUrl,
        link: rootUrl,
        favicon: `${rootUrl}/favicon.ico`,
        docs: 'http://example.com/rss/docs.html',
        copyright: `${new Date(Date.now()).getFullYear()} Spencer Sokol`,
        generator: 'SimplePosts',
        language: 'en',
        feedLinks: {
            rss: `${rootUrl}/${rssFileName}`
        }
    });

    const filteredContent = content.filter(item => !rssExcludePostTypes.includes(item.type));

    const postTypePrefixes : Record<string, string> = {};

    console.log('Generating RSS...');

    for (let i = 0; i < rssLength && i < filteredContent.length; i++) {
        
        const item = filteredContent[i];

        if (!postTypePrefixes.keys.includes(item.type)) {
            const type = postTypes.find((type) => type.name === item.type);
            if (!type)
                continue;
            postTypePrefixes[item.type] = type.prefix;
        }
        
        const prefix = postTypePrefixes[item.type] ? '/' + postTypePrefixes[item.type] : '';
        const permalink = `${rootUrl}${prefix}/${item.slug}/`;

        console.log(`Adding post ${permalink}`);

        const feedItem : Item = {
            title: item.title,
            description: item.description,
            content: showdown.makeHtml(item.content),
            date: new Date(item.date),
            link: permalink
        };

        // generate the author
        if (item.authorName) {
            let feedItemAuthor : { name: string, email?: string, link?: string } = { name: item.authorName };
            if (item.authorEmail)
                feedItemAuthor.email = item.authorEmail;
            if (item.authorURL)
                feedItemAuthor.link = item.authorURL
            feedItem.author = [feedItemAuthor];
        } else {
            feedItem.author = [author];
        }

        feed.addItem(feedItem);
    }

    const xml = feed.rss2();

    console.log(`Generated RSS (${xml.length} bytes)`);
    console.log(path.join(outputDir, rssFileName));

    writeFile(path.join(outputDir, rssFileName), xml, (err) => {
        if (err) console.log(err);
    });

    // try {
    //     writeFileSync(path.join(outputDir, rssFileName), xml.toString(), { encoding: 'utf8' });
    // } catch (err) {
    //     console.log('Error generating RSS:', err);
    // }
    
}