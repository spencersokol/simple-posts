
export interface ISimplePostMetaData {
    title: string,
    type: string,
    slug: string
}

export interface ISimplePost extends ISimplePostMetaData {
    content: string
}
