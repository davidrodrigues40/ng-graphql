import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import * as breadcrumbReducers from './breadcrumbs/breadcrumbs-reducer';

export const reducers: ActionReducerMap<AppState> = {
    breadcrumbState: breadcrumbReducers.breadcrumbReducer
}