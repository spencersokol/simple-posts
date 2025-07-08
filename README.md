# Simple Posts

Simple Posts is a tool to help you build a Markdown-based static React site with posts and pages. It includes necessary types, React context, and Vite plugin.

## Installation

Use the package manager [npm](https://npmjs.com) to install Simple Posts.

```bash
npm install @idkwtm/simple-posts
```

## Usage

## Types

`SimplePost` includes all of the properties `SimplePostMetaData`.

`SimplePostOptions` holds all the options for the Vite plugin.

`SimplePostsContextData` and `SimplePostsContextProviderProps` round out the React Context API necessities.

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

### React
