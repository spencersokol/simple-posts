import parseMD from "parse-md";
import { ISimplePost, ISimplePostMetaData } from "./post.types";

export abstract class BaseSimplePostFactory {
    abstract createPost(meta: ISimplePostMetaData, content: string) : ISimplePost;
}

export class SimplePostFactory extends BaseSimplePostFactory {

    createPost(meta: ISimplePostMetaData, content: string): ISimplePost {

        const post = {} as ISimplePost;

        post.title = meta.title ?? 'Untitled';
        post.slug = meta.slug ?? 'untitled';

        post.content = content;

        return post;
    }

}