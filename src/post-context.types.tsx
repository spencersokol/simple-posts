import { ReactNode } from "react";
import { ISimplePost } from "./post.types";

export interface ISimplePostsContextData {
    hasPosts: () => boolean,
    getPostBySlug: (slug: string) => ISimplePost | undefined,
    getPageBySlug: (slug: string) => ISimplePost | undefined,
    getPosts: () => ISimplePost[],
    getPages: () => ISimplePost[]
}

export type ISimplePostsContextProviderProps = {
    children?: ReactNode,
    content: ISimplePost[]
}
