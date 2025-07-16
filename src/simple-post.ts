import { ISimplePost } from "./simple-post.types"

/**
 * SimplePost class allows for future functionality.
 */
export class SimplePost implements ISimplePost {

    content: string
    title: string
    type: string
    slug: string
    date: Date
    description: string
    authorName: string
    authorEmail: string
    authorURL: string

    constructor(data : ISimplePost) {
        this.content = data.content;
        this.date = data.date;
        this.description = data.description;
        this.slug = data.slug;
        this.title = data.title;
        this.type = data.type;
        this.authorEmail = data.authorEmail;
        this.authorName = data.authorName;
        this.authorURL = data.authorURL;
    }

}