import { BooksState } from "./books/books.state";
import { BreadcrumbState } from "./breadcrumbs/breadcrumbs-state";

export interface AppState {
    booksState: BooksState;
    breadcrumbState: BreadcrumbState
}