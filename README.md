# Simple Posts

Simple Posts is a tool to help you build a Markdown-based static React site with posts and pages. It includes necessary types, React context, and Vite plugin.

## Motivation

The goal for this project is to have a simple process to create content in Markdown format and easily structure and access that content in a React app. For a small personal site, users may not want to incur the debt of a database, users, roles, APIs, etc. that usually comes with a CMS—or learn a new project templating system—in order just to build a small site. SimplePosts is designed as a Vite plugin to process a directory of Markdown files and allow access to that data through a React Context. This allows you to focus on the important parts: writing content and designing your React site.

## Installation

Use the package manager [npm](https://npmjs.com) to install Simple Posts.

```bash
npm install @idkwtm/simple-posts
```

## Quick Start

1. Create a `/src/content/posts` and `/src/content/pages` folder in your project and add your Markdown files to them with the proper [metadata](#content-metadata).
2. Add the `SimplePosts` plugin to your `vite.config.ts`
3. Add the `<SimplePostsProvider>` component to your app.
4. Access the data in your child components via the `useSimplePostsContext`.

## Usage

### Content

You can store your content anywhere in your Vite React project, but by default it expects to find your Markdown files in the `/src/content` directory of your project. Posts should be in `/src/content/posts` and pages in `/src/content/pages`, by default.

The Vite plugin will process all of this information into a single `content.json` file that will be stored in the `/public` folder by default.

> *Please note that all of the Markdown content is meant for public consumption and no effort is made to secure any of this information.*

#### Content Metadata

Building a content-based site requires each piece of content to have some metadata. The expected metadata should be at the top of every Markdown file and should look similar to:

```md
---
title: This is an Example Post
slug: example-post
date: 01-01-2025
description: This is a short description.
---
```

The `slug` can be used as part of the URL as a permalink, but currently there is no duplicate checking or formatting validation done on this field.

The `date` field is used to initially sort all of the content in reverse chronological order. If it is not provided, the system will attempt to use the file creation or modified timestamp.

### Types

`SimplePost` includes all of the properties `SimplePostMetaData`.

```js
{
    title: string,
    type: string,
    slug: string,
    date: Date,
    content: string
}
```

`SimplePostsContextData` and `SimplePostsContextProviderProps` round out the React Context API necessities.

`SimplePostOptions` holds all the options for the Vite plugin.

`SimplePostType` describes additional custom post types and the subdirectory they're stored in.

### Setup & Vite Plugin

Tell SimplePosts where your library of Markdown files are for posts and pages (`/src/content/posts` and `/src/context/pages` by default). Add the `SimplePosts` plugin to your list of plugins in the `vite.config.ts`

```js
export default defineConfig({
    plugins: [
        ...
        SimplePosts()
    ],
    ...
});
```

#### Vite Plugin Options

```js
{
    pretty?: boolean,
    outputDir?: string,
    contentDir?: string,
    additionalPostTypes?: SimplePostType[],
    postFactory?: BaseSimplePostFactory
}
```

1. `pretty` will output the `content.json` file in a human-readable JSON format.
2. `outputDir` defaults to the `/public` folder in the project.
3. `contentDir` defaults to the `/src/content` folder in the project.
4. `additionalPostTypes` allows you to add custom post types beyond `page` and `post`.
5. `postFactory` defaults to the `BaseSimplePostFactory`

### React

SimplePosts uses the Context API, so to get started, add the `SimplePostsProvider` to your app.

```js
    ...
    return (
        <SimplePostsProvider>
            ...
        </SimplePostsProvider>
    )
    ...
```

Then any child component can reference the `useSimplePostsContext` to access any of your Markdown posts as objects. There are multiple methods available to pull data from the context.

```js
{
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
```

### Extensibility & Custom Post Types

You can fully extend SimplePosts to create custom post types with additional functionality and metadata to meet your needs. For example, if you wanted to add a YouTube URL to your posts and build embed code:

```js
import { SimplePostFactory, ISimplePost, ISimplePostMetaData } from "@idkwtm/simple-posts";

export interface MySimplePostMetaData extends SimplePostMetaData {
    youtubeUrl: string
}

export interface MySimplePost extends MySimplePostMetaData, SimplePost {}

export class MySimplePostFactory extends SimplePostFactory {

    createPost(meta: MySimplePostMetaData, content: string): MySimplePost {
        
        const post = super.createPost(meta, content) as MySimplePost;

        post.youtubeUrl = meta.youtubeUrl ?? '';

        return post;
    }
    
}
```

Then be sure to add the post factory to the Vite plugin options.

```js
SimplePosts({
    postFactory: new MySimplePostFactory(),
}),
```