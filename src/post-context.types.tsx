import { ReactNode } from "react";
import { ISimplePost } from "./post.types";

export interface SimplePostsContextData {
    hasPosts: () => boolean,
    getPostBySlug: (slug: string) => ISimplePost | undefined,
    getPageBySlug: (slug: string) => ISimplePost | undefined
}

export type SimplePostsContextProviderProps = {
    children?: ReactNode
    posts: ISimplePost[],
    pages: ISimplePost[]
}
