import { BaseSimplePostFactory } from "./post-factory"

export type ISimplePostOptions = {
    pretty?: boolean,
    outputDir?: string,
    contentDir?: string,
    additionalPostTypes?: ISimplePostType[],
    postFactory?: BaseSimplePostFactory
}

export type ISimplePostType = {
    name: string,
    directory: string
}
