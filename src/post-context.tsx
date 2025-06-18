import React, { createContext, useContext } from 'react';
import { ISimplePost } from './post.types';
import { ISimplePostsContextData, ISimplePostsContextProviderProps } from './post-context.types';

const SimplePostsContext = createContext<ISimplePostsContextData>({} as ISimplePostsContextData);

export const SimplePostsProvider = ({ content, children }: ISimplePostsContextProviderProps) => {

    const posts = content.filter((post) => 'post' === post.type.toLowerCase().trim());
    const pages = content.filter((post) => 'page' === post.type.toLowerCase().trim());

    const data = {
        isLoaded: () : boolean => {
            return (Array.isArray(content) && (content.length > 0));
        },
        hasPosts: () : boolean => {
            return (posts.length > 0);
        },
        hasPages: () : boolean => {
            return (pages.length > 0);
        },
        hasPostsOfType: (type: string) : boolean => {
            const temp = content.filter((value) => (value.type === type));
            return (temp.length > 0);
        },
        getPostBySlug: (slug: string) : ISimplePost | undefined => {
            return posts.find((post: ISimplePost) => post.slug === slug) as ISimplePost | undefined;
        },
        getPageBySlug: (slug: string) : ISimplePost | undefined => {
            return pages.find((page: ISimplePost) => page.slug === slug) as ISimplePost | undefined;
        },
        getPostOfTypeBySlug: (type: string, slug: string) : ISimplePost | undefined => {
            return content.find((post: ISimplePost) => post.slug === slug && post.type === type) as ISimplePost | undefined;
        },
        getPosts: () : ISimplePost[] => {
            return posts;
        },
        getPages: () : ISimplePost[] => {
            return pages;
        },
        getPostsOfType: (type: string) : ISimplePost[] => {
            return content.filter((value: ISimplePost) => (value.type === type));
        }
    };

    return (
        <SimplePostsContext.Provider value={data}>{children}</SimplePostsContext.Provider>
    );
}

export const useSimplePostsContext = () => useContext(SimplePostsContext)