import React, { createContext, useContext } from 'react';
import { ISimplePost } from './post.types';
import { SimplePostsContextData, SimplePostsContextProviderProps } from './post-context.types';

const SimplePostsContext = createContext<SimplePostsContextData>({} as SimplePostsContextData);

export const SimplePostsProvider = ({ posts, pages, children }: SimplePostsContextProviderProps) => {

    const data = {
        hasPosts: () : boolean => {
            return (posts.length > 0);
        },
        getPostBySlug: (slug: string) : ISimplePost | undefined => {
            return posts.find((post: ISimplePost) => post.slug === slug) as ISimplePost | undefined;
        },
        getPageBySlug: (slug: string) : ISimplePost | undefined => {
            return pages.find((page: ISimplePost) => page.slug === slug) as ISimplePost | undefined;
        }
    };

    return (
        <SimplePostsContext.Provider value={data}>{children}</SimplePostsContext.Provider>
    );
}

export const useSimplePostsContext = () => useContext(SimplePostsContext)