import { Author } from "./author";
import { GUID } from "../../custom-types/types";

export interface Book {
    id: GUID,
    title: string,
    pageCount: number,
    author: Author
}