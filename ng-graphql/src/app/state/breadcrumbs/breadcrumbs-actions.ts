import { createActionGroup, props } from "@ngrx/store";
import { NavigationItem } from "src/app/services/navigation/navigation-item";

export const BreadcrumbActions = createActionGroup({
    source: 'BREADCRUMBS',
    events: {
        'Set': props<{ breadcrumbs: NavigationItem[] }>(),
        'Add': props<{ breadcrumb: NavigationItem }>(),
        'GoTo': props<{ breadcrumb: NavigationItem }>()
    }
});