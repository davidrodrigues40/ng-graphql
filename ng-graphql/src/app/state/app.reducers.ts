import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import * as bookReducers from './books/books-reducer';
import * as breadcrumbReducers from './breadcrumbs/breadcrumbs-reducer';

export const reducers: ActionReducerMap<AppState> = {
    booksState: bookReducers.booksReducer,
    breadcrumbState: breadcrumbReducers.breadcrumbReducer
}