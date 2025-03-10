
import { Operator } from "../enums/operators";
import { Field, IField } from "./field";

export interface IWhereClause {
    readonly or: IClause[];
    readonly and: IClause[];
}

export interface IClause {
    readonly field: IField;
    readonly operator: Operator;
    readonly value: any;
}

export enum ClauseType {
    NOTSET = 'NOTSET',
    OR = 'OR',
    AND = 'AND'
}

export class Clause implements IClause {
    field: IField = new Field("");
    operator: Operator = Operator.NOTSET;
    value: any;

}
