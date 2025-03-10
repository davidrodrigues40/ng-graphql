import { Person } from "src/app/services/pdf/person";

export interface PdfState {
    html: string;
    person: Person
}