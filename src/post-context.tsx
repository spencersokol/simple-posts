import React, { createContext, ReactNode, useContext, useState } from 'react';
import { SimplePost } from './post.types';

export interface SimplePostsContextData {
    pages: SimplePost[],
    posts: SimplePost[],
    hasPosts: () => boolean,
    getPostBySlug: (slug: string) => SimplePost | undefined,
    getPageBySlug: (slug: string) => SimplePost | undefined
}

export type SimplePostsContextProviderProps = {
    children?: ReactNode,
    posts: SimplePost[],
    pages: SimplePost[]
}

const SimplePostsContext = createContext<SimplePostsContextData | null>(null);

export const SimplePostsProvider = ({ posts, pages, children }: SimplePostsContextProviderProps) => {

    const [_posts, setPosts] = useState<SimplePost[]>([]);
    const [_pages, setPages] = useState<SimplePost[]>([]);
    
    setPosts(posts);
    setPages(pages);
    
    const data = {
        posts,
        pages,
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
        <SimplePostsContext.Provider value={data}>
            {children}
        </SimplePostsContext.Provider>
    );
}

export const useSimplePostsContext = () => useContext(SimplePostsContext);