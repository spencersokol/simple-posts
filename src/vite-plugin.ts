import { PluginOption, ResolvedConfig } from 'vite';
import path from 'path';
import { PathLike, PathOrFileDescriptor, readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { ISimplePostOptions, ISimplePostType } from './vite-plugin.types';
import { ISimplePost, ISimplePostMetaData } from './simple-post.types';
import { BaseSimplePostFactory, SimplePostFactory } from './simple-post-factory';
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

            const content: ISimplePost[] = [];

            // set defaults for empty options
            const { 
                postFactory = new SimplePostFactory(), 
                additionalPostTypes : postTypes = [],
                contentDir = path.join(config.root, '/src/content'),
                outputDir = path.join(config.root, '/public'),
                pretty = false
            } = options;

            postTypes.unshift({ name: 'page', directory: 'pages'});
            postTypes.unshift({ name: 'post', directory: 'posts'});
            
            console.log('Processing content.');

            postTypes.forEach((type: ISimplePostType) => {
                const postTypeDir = path.join(contentDir, `/${type.directory}`);
                console.log(type.name, postTypeDir);
                const posts = ReadDirectory(postFactory, postTypeDir, type.name);
                content.push(...posts);
            })

            // sort the content by date, newest to oldest
            content.sort((a: ISimplePost, b: ISimplePost) : number => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateB - dateA;
            });

            writeFileSync(`${outputDir}/content.json`, (pretty) ? JSON.stringify(content, null, 4) : JSON.stringify(content));
            
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

function GetFileDate(filepath: PathOrFileDescriptor) : Date {
    try {
        const stats = statSync(filepath.toString());
        if (stats.birthtime)
            return stats.birthtime;
        else if (stats.mtime)
            return stats.mtime;
        else
            return new Date(Date.now());
    } catch (err) {
        return new Date(Date.now());
    }
}

function ParseFile(factory: BaseSimplePostFactory, filepath: PathOrFileDescriptor, type: string) : ISimplePost | null {

    try {
        const data: string = readFileSync(filepath, 'utf-8');
        const { metadata, content } = parseMD(data);
        const meta: ISimplePostMetaData = metadata as ISimplePostMetaData;
        meta.type = meta.type ?? type;
        meta.date = meta.date ?? GetFileDate(filepath);
        const post = factory.createPost(meta, content);
        return post;
    } catch (err) {
        console.error('Could not read file:', filepath);
        return null;
    }

}