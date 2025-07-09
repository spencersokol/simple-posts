import { BaseSimplePostFactory } from "./post-factory"

export type SimplePostOptions = {
    pretty?: boolean,
    outputDir?: string,
    contentDir?: string,
    additionalPostTypes?: SimplePostType[],
    postFactory?: BaseSimplePostFactory
}

export type SimplePostType = {
    name: string,
    directory: string
}
