import { ReactNode } from "react";
import { SimplePost } from "./post.types";

export interface SimplePostsContextData {
    hasPosts: () => boolean,
    getPostBySlug: (slug: string) => SimplePost | undefined,
    getPageBySlug: (slug: string) => SimplePost | undefined
}

export type SimplePostsContextProviderProps = {
    children?: ReactNode
    posts: SimplePost[],
    pages: SimplePost[]
}
