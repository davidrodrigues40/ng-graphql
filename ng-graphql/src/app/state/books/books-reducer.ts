import { createReducer, on } from "@ngrx/store";
import { BooksActions } from "./books-actions";
import { BooksState } from "./books.state";

const booksState: BooksState = {
    books: []
};

export const booksReducer = createReducer(
    booksState,
    on(BooksActions.searchBooksSuccess, (_state, { books }) => ({ ..._state, books: books }))
);