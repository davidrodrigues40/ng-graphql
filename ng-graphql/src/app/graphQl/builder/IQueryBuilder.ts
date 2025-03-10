import { Operator } from "../enums/operators";
import { ClauseType } from "../models/clauses";
import { IField } from "../models/field";
import { QueryPayload } from "../models/query-payload";
import { IVariable } from "../models/variable";


export interface IQueryBuilder {
    build(): QueryPayload;
    addWhere(field: IField, operator: Operator, value: any, clauseType: ClauseType): IQueryBuilder;
    returnField(field: IField): IQueryBuilder;
    addVariable(variable: IVariable<any>): IQueryBuilder;
}