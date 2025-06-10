import { ReactNode } from "react";
import { ISimplePost } from "./post.types";

export interface ISimplePostsContextData {
    hasPosts: () => boolean,
    getPostBySlug: (slug: string) => ISimplePost | undefined,
    getPageBySlug: (slug: string) => ISimplePost | undefined
}

export type ISimplePostsContextProviderProps = {
    children?: ReactNode
    posts: ISimplePost[],
    pages: ISimplePost[]
}
