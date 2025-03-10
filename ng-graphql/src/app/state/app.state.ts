import { BreadcrumbState } from "./breadcrumbs/breadcrumbs-state";
import { PdfState } from "./pdf/pdf-state";

export interface AppState {
    breadcrumbState: BreadcrumbState;
    pdfState: PdfState
}