
export interface SimplePostMetaData {
    title: string,
    type: string,
    slug: string,
    description: string
}

export interface SimplePost extends SimplePostMetaData {
    content: string
}
