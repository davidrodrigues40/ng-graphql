import { Operator } from "../enums/operators";
import { IField } from "../models/field";
import { QueryPayload } from "../models/query-payload";
import { IVariable } from "../models/variable";


export interface IQueryBuilder {
    build(): QueryPayload;
    return(field: string): this;
    return(field: IField): this;
    return(operation: Function): this;
    return(field: any): this;
    addVariable(variable: IVariable<any>): IQueryBuilder;
}

export interface ISearchQueryBuilder extends IQueryBuilder {
    take(take: number): this;
    skip(skip: number): this;
    addOrCondition(field: IField, operator: Operator, value: any): IQueryBuilder;
    addAndCondition(field: IField, operator: Operator, value: any): IQueryBuilder;
}