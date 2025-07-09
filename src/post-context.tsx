import React, { createContext, useContext, useState, useEffect } from 'react';
import { ISimplePost } from './post.types';
import { SimplePostsContextData, SimplePostsContextProviderProps } from './post-context.types';

const SimplePostsContext = createContext<SimplePostsContextData>({} as SimplePostsContextData);

/**
 * @param {SimplePostContextProviderProps} props The React props for this provider.
 * @param {string} props.url The url prop has a default value of '/content.json'.
 * @param {React.ReactNode[]} props.children Any children of the provider component.
 * @returns {SimplePostsContext.Provider} The SimplePosts context provider.
 */
export const SimplePostsProvider = ({ url = '/content.json', children }: SimplePostsContextProviderProps) => {

    const [content, setContent] = useState<ISimplePost[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        const initSimplePosts = async () => {
            try {
                const data = await getData(url);
                setContent(data);
                setIsLoading(false);
            } catch (err) {
                console.error('Unable to load SimplePost content:', err);
            }
        }

        initSimplePosts();

    }, []); // only render once

    const data : SimplePostsContextData = buildContextData(content, isLoading);

    return (
        <SimplePostsContext.Provider value={data}>{children}</SimplePostsContext.Provider>
    );
}

/**
 * @returns {ISimplePostsContextData} The React context
 */
export const useSimplePostsContext = () : SimplePostsContextData => useContext(SimplePostsContext);

async function getData(url: string) : Promise<ISimplePost[]> {

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('fetch failed.');
            }
            return response.json();
        })
        .then(data => {
            // TODO: verify data
            if (Array.isArray(data)) {
                return data;
            } else {
                throw new Error('Invalid SimplePost content.');
            }
        });

}

function buildContextData(content : ISimplePost[], isLoading : boolean) : SimplePostsContextData {

    return {
        isLoaded: () : boolean => {
            return !isLoading && (Array.isArray(content) && (content.length > 0));
        },
        hasPosts: function() : boolean {
            return (this.getPosts().length > 0);
        },
        hasPages: function() : boolean {
            return (this.getPages().length > 0);
        },
        hasPostsOfType: (type: string) : boolean => {
            const temp = content.filter((value) => (value.type === type));
            return (temp.length > 0);
        },
        getPostBySlug: function(slug: string) : ISimplePost | undefined {
            return this.getPosts().find((post: ISimplePost) => post.slug === slug) as ISimplePost | undefined;
        },
        getPageBySlug: function(slug: string) : ISimplePost | undefined {
            return this.getPages().find((page: ISimplePost) => page.slug === slug) as ISimplePost | undefined;
        },
        getPostOfTypeBySlug: (type: string, slug: string) : ISimplePost | undefined => {
            return content.find((post: ISimplePost) => post.slug === slug && post.type === type) as ISimplePost | undefined;
        },
        getPosts: () : ISimplePost[] => {
            return content.filter((post) => 'post' === post.type.toLowerCase().trim());
        },
        getPages: () : ISimplePost[] => {
            return content.filter((post) => 'page' === post.type.toLowerCase().trim());
        },
        getPostsOfType: (type: string) : ISimplePost[] => {
            return content.filter((value: ISimplePost) => (value.type === type));
        }
    };

}