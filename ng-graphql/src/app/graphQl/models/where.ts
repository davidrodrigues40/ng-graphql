import { Condition } from "../enums/condition";
import { Operator } from "../enums/operators";
import { IField } from "./field";

export class Where implements IWhere {
    get condition(): Condition { return this._condition; };
    get field(): IField { return this._field; };
    get operator(): Operator { return this._operator; };
    get value(): string { return this._value; };

    constructor(private readonly _condition: Condition, private readonly _field: IField, private readonly _operator: Operator, private readonly _value: string) {
    }
}

export interface IWhere {
    readonly field: IField;
    readonly operator: Operator;
    readonly value: string;
    readonly condition: Condition;
}