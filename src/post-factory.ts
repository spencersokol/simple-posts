import { ISimplePost, ISimplePostMetaData, SimplePost } from "./post.types";

export abstract class BaseSimplePostFactory {
    abstract createPost(meta: ISimplePostMetaData, content: string) : SimplePost;
}

export class SimplePostFactory extends BaseSimplePostFactory {

    createPost(meta: ISimplePostMetaData, content: string): SimplePost {

        const post = {} as ISimplePost;

        post.title = meta.title ?? 'Untitled';
        post.slug = meta.slug ?? 'untitled';
        post.type = meta.type ?? 'post';
        post.date = meta.date ?? new Date(Date.now());
        post.description = meta.description ?? '';

        post.content = content;

        return new SimplePost(post);
    }

}