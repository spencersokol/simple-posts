import parseMD from "parse-md";
import { ISimplePost as _SimplePost, ISimplePostMetaData } from "./post.types";

export class SimplePost implements _SimplePost {

    type: string = '';
    title: string = '';
    content: string = '';
    slug: string = '';
    description: string = '';

}
