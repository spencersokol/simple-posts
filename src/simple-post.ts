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

    constructor(data : ISimplePost) {
        this.content = data.content;
        this.date = data.date;
        this.description = data.description;
        this.slug = data.slug;
        this.title = data.title;
        this.type = data.type;    
    }

}