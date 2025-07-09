/**
 * Meta data for SimplePost, separated for extensibility
 */
export interface ISimplePostMetaData {
    title: string,
    type: string,
    slug: string,
    date: Date,
    description: string
}

/**
 * 
 */
export interface ISimplePost extends ISimplePostMetaData {
    content: string
}
