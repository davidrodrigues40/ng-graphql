import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import * as breadcrumbReducers from './breadcrumbs/breadcrumbs-reducer';
import * as pdfReducers from './pdf/pdf-reducer';

export const reducers: ActionReducerMap<AppState> = {
    breadcrumbState: breadcrumbReducers.breadcrumbReducer,
    pdfState: pdfReducers.pdfReducer
}