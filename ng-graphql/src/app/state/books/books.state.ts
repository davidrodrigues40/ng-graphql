import { Book } from "src/app/graphQl/queryTypes/book";

export class BooksState {
    books: ReadonlyArray<Book> = [];
}