import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PdfState } from "./pdf-state";

const pdfFeature = createFeatureSelector<Readonly<PdfState>>('pdfState');

export const person = createSelector(
    pdfFeature,
    (state: PdfState) => state.person
)

export const html = createSelector(
    pdfFeature,
    (state: PdfState) => state.html
)