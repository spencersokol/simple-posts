import { PluginOption, ResolvedConfig } from 'vite';
import path from 'path';
import { PathLike, PathOrFileDescriptor, readdirSync, readFileSync, writeFileSync } from 'fs';
import { ISimplePostOptions } from './vite-plugin.types';
import { ISimplePost } from './post.types';
import { BaseSimplePostFactory, SimplePostFactory } from './post-factory';

export default function SimplePosts(options : ISimplePostOptions = {}) : PluginOption {

    let config: ResolvedConfig;

    return {
        name: 'simple-posts:build',
        apply: 'build',
        configResolved(_config) {
            config = _config;
        },
        buildStart() {

            // set defaults for empty options
            options.outputDir = options.outputDir ?? path.join(config.root, '/src/content');
            options.pagesInputDir = options.pagesInputDir ?? path.join(config.root, '/src/content/pages');
            options.postsInputDir = options.postsInputDir ?? path.join(config.root, '/src/content/posts');
            options.pretty = options.pretty ?? false;

            const { postFactory = new SimplePostFactory() } = options;

            console.log('Processing pages and posts.');
            console.log('Posts Dir:', options.postsInputDir);
            console.log('Pages Dir:', options.pagesInputDir);

            const pages = ReadDirectory(postFactory, options.pagesInputDir);
            const posts = ReadDirectory(postFactory, options.postsInputDir);

            writeFileSync(`${options.outputDir}/pages.json`, (options.pretty) ? JSON.stringify(pages, null, 4) : JSON.stringify(pages));
            writeFileSync(`${options.outputDir}/posts.json`, (options.pretty) ? JSON.stringify(posts, null, 4) : JSON.stringify(posts));
            
        }
    }
};

function ReadDirectory(factory: BaseSimplePostFactory, dirpath: PathLike): ISimplePost[] {

    const posts: ISimplePost[] = [];

    try {
        const files: String[] = readdirSync(dirpath);

        files.forEach((file, index) => {
            console.log(`Reading ${file} (#${index})`);

            let post = ParseFile(factory, `${dirpath}/${file}`);

            if (post)
                posts.push(post);
        });

        return posts;
    } catch(err) {
        console.error('Failed to read directory.', dirpath);
        return posts;
    }

}

function ParseFile(factory: BaseSimplePostFactory, filepath: PathOrFileDescriptor) : ISimplePost | null {

    try {
        const content: string = readFileSync(filepath, 'utf-8');
        const post = factory.createPost(content);
        return post;
    } catch (err) {
        console.error('Could not read file:', filepath);
        return null;
    }

}