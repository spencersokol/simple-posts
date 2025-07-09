import { SimplePost, SimplePostMetaData } from "./post.types";

export abstract class BaseSimplePostFactory {
    abstract createPost(meta: SimplePostMetaData, content: string) : SimplePost;
}

export class SimplePostFactory extends BaseSimplePostFactory {

    createPost(meta: SimplePostMetaData, content: string): SimplePost {

        const post = {} as SimplePost;

        post.title = meta.title ?? 'Untitled';
        post.slug = meta.slug ?? 'untitled';
        post.type = meta.type ?? 'post';
        post.date = meta.date ?? new Date(Date.now());

        post.content = content;

        return post;
    }

}