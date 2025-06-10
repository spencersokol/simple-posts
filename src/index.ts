import type { ISimplePost as _SimplePost, ISimplePostMetaData as _SimplePostMetaData } from "./post.types"
import { SimplePostsProvider, useSimplePostsContext } from "./post-context"
import type { 
    SimplePostsContextData as _SimplePostsContextData, 
    SimplePostsContextProviderProps as _SimplePostsContextProviderProps 
} from "./post-context.types"

// TODO output data to public dir?
// TODO genericize the SimplePost class to allow for extendability?

export type SimplePost = _SimplePost
export type SimplePostMetaData = _SimplePostMetaData

export { SimplePostsProvider, useSimplePostsContext }
export type SimplePostsContextData = _SimplePostsContextData
export type SimplePostsContextProviderProps = _SimplePostsContextProviderProps