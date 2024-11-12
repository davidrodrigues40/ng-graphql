import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BooksState } from "./books.state";

const booksStateFeature = createFeatureSelector<Readonly<BooksState>>('booksState');

export const books = createSelector(
    booksStateFeature,
    (state: BooksState) => state.books
)