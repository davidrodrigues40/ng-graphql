import { Type } from "@angular/core";

export interface IVariable<TType> {
    readonly name: string;
    readonly type: Type<TType>;
    readonly value: any;
}

export class Variable<TType> implements IVariable<TType> {

    constructor(name: string, value: any, type: Type<TType>) {
        this.name = name;
        this.value = value;
        this.type = type;
    }
    readonly name: string;
    readonly type: Type<TType>;
    readonly value: any;
}