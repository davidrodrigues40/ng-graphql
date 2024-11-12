import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BreadcrumbState } from "./breadcrumbs-state";

const breadcrumbFeature = createFeatureSelector<Readonly<BreadcrumbState>>('breadcrumbState');

export const breadcrumbs = createSelector(
    breadcrumbFeature,
    (state: BreadcrumbState) => state.breadcrumbs
)