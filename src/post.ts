import parseMD from "parse-md";
import { SimplePost as _SimplePost, SimplePostMetaData } from "./post.types";

export class SimplePost implements _SimplePost {

    readonly type: string = '';
    readonly title: string = '';
    readonly content: string = '';
    readonly slug: string = '';
    readonly description: string = '';

    constructor(markdown: string) {

        const { metadata, content } = parseMD(markdown);
        const meta : SimplePostMetaData = metadata as SimplePostMetaData;

        this.title = meta.title;
        this.description = meta.description || '';
        this.slug = meta.slug;

        this.content = content;

    }

}
