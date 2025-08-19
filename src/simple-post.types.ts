/**
 * Meta data for SimplePost, separated for extensibility
 */
export interface ISimplePostMetaData {
    title: string,
    type: string,
    slug: string,
    date: Date,
    description: string,
    authorName: string,
    authorEmail: string,
    authorURL: string,
    published: boolean
}

/**
 * 
 */
export interface ISimplePost extends ISimplePostMetaData {
    content: string
}
