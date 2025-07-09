import { ReactNode } from "react";
import { ISimplePost } from "./post.types";

/**
 * React context interface for SimplePosts with a number of useful
 * methods for quick content access.
 */
export interface SimplePostsContextData {
    isLoaded: () => boolean,
    hasPosts: () => boolean,
    hasPages: () => boolean,
    hasPostsOfType: (type: string) => boolean,
    getPostBySlug: (slug: string) => ISimplePost | undefined,
    getPageBySlug: (slug: string) => ISimplePost | undefined,
    getPostOfTypeBySlug: (type: string, slug: string) => ISimplePost | undefined,
    getPosts: () => ISimplePost[],
    getPages: () => ISimplePost[],
    getPostsOfType: (type: string) => ISimplePost[]
}

export type SimplePostsContextProviderProps = {
    url?: string,
    children?: ReactNode
}
