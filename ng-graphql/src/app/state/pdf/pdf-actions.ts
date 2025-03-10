import { createActionGroup, props } from "@ngrx/store";
import { Person } from "src/app/services/pdf/person";

export const pdfActions = createActionGroup({
    source: 'PDF',
    events: {
        'GetPersonById': props<{ id: number }>(),
        'GotPerson': props<{ data: Person }>()
    }
});