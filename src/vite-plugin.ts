import { PluginOption, ResolvedConfig } from 'vite';
import path from 'path';
import { PathLike, PathOrFileDescriptor, readdirSync, readFileSync, writeFileSync } from 'fs';
import { ISimplePostOptions } from './vite-plugin.types';
import { ISimplePost, ISimplePostMetaData } from './post.types';
import { BaseSimplePostFactory, SimplePostFactory } from './post-factory';
import parseMD from 'parse-md';

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
            options.outputDir = options.outputDir ?? path.join(config.root, '/public');
            options.pagesInputDir = options.pagesInputDir ?? path.join(config.root, '/src/content/pages');
            options.postsInputDir = options.postsInputDir ?? path.join(config.root, '/src/content/posts');
            options.pretty = options.pretty ?? false;

            const { postFactory = new SimplePostFactory() } = options;

            console.log('Processing pages and posts.');
            console.log('Posts Dir:', options.postsInputDir);
            console.log('Pages Dir:', options.pagesInputDir);

            // TODO: determine post types from subdirectories
            const pages = ReadDirectory(postFactory, options.pagesInputDir, 'page');
            const posts = ReadDirectory(postFactory, options.postsInputDir, 'post');

            const content = [ ...posts, ...pages ];

            writeFileSync(`${options.outputDir}/content.json`, (options.pretty) ? JSON.stringify(content, null, 4) : JSON.stringify(content));
            
        }
    }
};

function ReadDirectory(factory: BaseSimplePostFactory, dirpath: PathLike, type: string): ISimplePost[] {

    const posts: ISimplePost[] = [];

    try {
        const files: String[] = readdirSync(dirpath);

        files.forEach((file, index) => {
            console.log(`Reading ${file} (#${index})`);

            let post = ParseFile(factory, `${dirpath}/${file}`, type);

            if (post)
                posts.push(post);
        });

        return posts;
    } catch(err) {
        console.error('Failed to read directory.', dirpath);
        return posts;
    }

}

function ParseFile(factory: BaseSimplePostFactory, filepath: PathOrFileDescriptor, type: string) : ISimplePost | null {

    try {
        const data: string = readFileSync(filepath, 'utf-8');
        const { metadata, content } = parseMD(data);
        const meta: ISimplePostMetaData = metadata as ISimplePostMetaData;
        meta.type = meta.type ?? type;
        const post = factory.createPost(meta, content);
        return post;
    } catch (err) {
        console.error('Could not read file:', filepath);
        return null;
    }

}