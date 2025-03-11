
import { Operator } from "../enums/operators";
import { Field, IField } from "./field";

export interface IWhereClause {
    readonly or: ICondition[];
    readonly and: ICondition[];
}

export interface ICondition {
    readonly field: IField;
    readonly operator: Operator;
    readonly value: any;
}

export class Condition implements ICondition {
    field: IField = new Field("");
    operator: Operator = Operator.NOTSET;
    value: any;

}
