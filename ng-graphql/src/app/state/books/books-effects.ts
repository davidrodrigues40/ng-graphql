import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import * as actions from './books-actions';
import { GraphQlService } from "src/app/services/graph-ql/graphql.service";

@Injectable()
export class BooksEffects {

    constructor(
        private readonly _actions$: Actions,
        private readonly _graphQlService: GraphQlService) { }

    search$ = createEffect(() => this._actions$.pipe(
        ofType(actions.BooksActions.searchBooks),
        mergeMap(action => this._graphQlService.DoQuery(action.query)
            .pipe(
                map(response => actions.BooksActions.searchBooksSuccess({ books: response.books }))
            ))
    ));
}
