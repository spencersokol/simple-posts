import React, { createContext, ReactNode, useContext } from 'react';
import { SimplePost } from './post.types';

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

const SimplePostsContext = createContext<SimplePostsContextData>({} as SimplePostsContextData);

export const SimplePostsProvider = ({ posts, pages, children }: SimplePostsContextProviderProps) => {

    const data = {
        hasPosts: () : boolean => {
            return (posts.length > 0);
        },
        getPostBySlug: (slug: string) : SimplePost | undefined => {
            return posts.find((post: SimplePost) => post.slug === slug) as SimplePost | undefined;
        },
        getPageBySlug: (slug: string) : SimplePost | undefined => {
            return pages.find((page: SimplePost) => page.slug === slug) as SimplePost | undefined;
        }
    };

    return (
        <SimplePostsContext.Provider value={data}>{children}</SimplePostsContext.Provider>
    );
}

export const useSimplePostsContext = () => useContext(SimplePostsContext)