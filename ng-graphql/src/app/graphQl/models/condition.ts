import { Operator } from "../enums/operators";
import { IField } from "./field";

export interface ICondition {
    readonly field: IField;
    readonly operator: Operator;
    readonly value: any;
}

export class Condition implements ICondition {
    constructor(private readonly _field: IField, private readonly _operator: Operator, private readonly _value: string) {
    }

    get field(): IField {
        return this._field;
    }

    get operator(): Operator {
        return this._operator;
    }

    get value(): string {
        return this._value;
    }

}