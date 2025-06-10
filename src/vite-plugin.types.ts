import { BaseSimplePostFactory } from "./post-factory"

export type ISimplePostOptions = {
    pretty?: boolean,
    outputDir?: string,
    pagesInputDir?: string,
    postsInputDir?: string,
    postFactory?: BaseSimplePostFactory
}
