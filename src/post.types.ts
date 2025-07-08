
export interface ISimplePostMetaData {
    title: string,
    type: string,
    slug: string,
    date: Date
}

export interface ISimplePost extends ISimplePostMetaData {
    content: string
}
