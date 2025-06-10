import parseMD from "parse-md";
import { ISimplePost, ISimplePostMetaData } from "./post.types";

export abstract class BaseSimplePostFactory {
    abstract createPost(markdown: string) : ISimplePost;
}

export class SimplePostFactory extends BaseSimplePostFactory {

    createPost(markdown: string): ISimplePost {

        const { metadata, content } = parseMD(markdown);
        const meta : ISimplePostMetaData = metadata as ISimplePostMetaData;

        const post = {} as ISimplePost;

        post.title = meta.title ?? 'Untitled';
        post.slug = meta.slug ?? 'untitled';

        post.content = content;

        return post;
    }

}