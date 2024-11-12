import { createReducer, on } from "@ngrx/store";
import * as actions from "./breadcrumbs-actions";
import { BreadcrumbState } from "./breadcrumbs-state";

const breadcrumbState: BreadcrumbState = {
    breadcrumbs: []
};

export const breadcrumbReducer = createReducer(
    breadcrumbState,
    on(actions.BreadcrumbActions.set, (_state, { breadcrumbs }) => ({ ..._state, breadcrumbs: breadcrumbs })),
    on(actions.BreadcrumbActions.add, (_state, { breadcrumb }) => {
        const bc = [..._state.breadcrumbs];
        bc.push(breadcrumb);

        return { ..._state, breadcrumbs: bc };
    }),
    on(actions.BreadcrumbActions.goTo, (_state, { breadcrumb }) => {
        const index = _state.breadcrumbs.findIndex(b => b.name === breadcrumb.name && b.url === breadcrumb.url);
        const bc = [..._state.breadcrumbs];
        bc.splice(index + 1, _state.breadcrumbs.length - index);

        return { ..._state, breadcrumbs: bc };
    })
);