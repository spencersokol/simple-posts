import { ReactNode } from "react";
import { ISimplePost } from "./post.types";

export interface ISimplePostsContextData {
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

export type ISimplePostsContextProviderProps = {
    children?: ReactNode,
    url: string
}
