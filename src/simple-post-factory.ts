import { ISimplePost, ISimplePostMetaData } from "./simple-post.types";
import { SimplePost } from "./simple-post";

/**
 * Factory definition for a SimplePost
 */
export abstract class BaseSimplePostFactory {
    abstract createPost(meta: ISimplePostMetaData, content: string) : SimplePost;
}

/**
 * Factory implementation for a SimplePost
 */
export class SimplePostFactory extends BaseSimplePostFactory {

    createPost(meta: ISimplePostMetaData, content: string): SimplePost {

        const post = {} as ISimplePost;

        post.title = meta.title ?? 'Untitled';
        post.slug = meta.slug ?? 'untitled';
        post.type = meta.type ?? 'post';
        post.date = meta.date ?? new Date(Date.now());
        post.description = meta.description ?? '';
        post.authorEmail = meta.authorEmail ?? '';
        post.authorName = meta.authorName ?? '';
        post.authorURL = meta.authorURL ?? '';

        post.content = content;

        return new SimplePost(post);
    }

}