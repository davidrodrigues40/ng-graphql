import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import * as actions from './pdf-actions';
import { GraphQlService } from "src/app/services/graph-ql/graphql.service";
import { PdfService } from "src/app/services/pdf/pdf.service";

@Injectable()
export class PdfEffects {

    constructor(
        private readonly _actions$: Actions,
        private readonly _pdfService: PdfService) { }

    search$ = createEffect(() => this._actions$.pipe(
        ofType(actions.pdfActions.getPersonById),
        mergeMap(action => this._pdfService.getPersonById(action.id)
            .pipe(
                map(response => actions.pdfActions.gotPerson({ data: response }))
            ))
    ));
}
