import { createReducer, on } from "@ngrx/store";
import * as actions from "./pdf-actions";
import { PdfState } from "./pdf-state";

const pdfState: PdfState = {
    html: '',
    person: {
        datasource: "",
        dataPulledDate: new Date(),
        ssan: "",
        id: "",
        personIdentifier: "",
        legacyPersonId: 0,
        activeDodId: "",
        activeCoreType: "",
        activeDisplayGradeAndFullName: "",
        records: []
    }
};

export const pdfReducer = createReducer(
    pdfState,
    on(actions.pdfActions.gotPerson, (_state, { data }) => ({ ..._state, person: data }))
);