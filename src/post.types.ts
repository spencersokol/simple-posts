
export interface SimplePostMetaData {
    title: string,
    type: string,
    slug: string,
    date: Date
}

export interface SimplePost extends SimplePostMetaData {
    content: string
}
