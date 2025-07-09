import { ReactNode } from "react";
import { SimplePost } from "./post.types";

/**
 * React context interface for SimplePosts with a number of useful
 * methods for quick content access.
 */
export interface SimplePostsContextData {
    isLoaded: () => boolean,
    hasPosts: () => boolean,
    hasPages: () => boolean,
    hasPostsOfType: (type: string) => boolean,
    getPostBySlug: (slug: string) => SimplePost | undefined,
    getPageBySlug: (slug: string) => SimplePost | undefined,
    getPostOfTypeBySlug: (type: string, slug: string) => SimplePost | undefined,
    getPosts: () => SimplePost[],
    getPages: () => SimplePost[],
    getPostsOfType: (type: string) => SimplePost[]
}

export type SimplePostsContextProviderProps = {
    url?: string,
    children?: ReactNode
}
