import { BaseSimplePostFactory } from "./simple-post-factory"

export type ISimplePostOptions = {
    pretty?: boolean,
    outputDir?: string,
    contentDir?: string,
    additionalPostTypes?: ISimplePostType[],
    postFactory?: BaseSimplePostFactory,
    rootUrl: string,
    contentFileName?: string,
    rssFileName?: string,
    rssLength?: number,
    rssExcludePostTypes: string[],
    siteTitle: string,
    siteDescription: string,
    author: {
        name: string,
        email: string,
        link: string
    },
    sitemapFileName?: string
}

export type ISimplePostType = {
    name: string,
    directory: string,
    prefix: string
}
