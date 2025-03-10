import { Type } from "@angular/core";

export interface IVariable<TType> {
    readonly name: string;
    readonly properties: string[];
    readonly type: Type<TType>;
    readonly value: any;
}

export class Variable<TType> implements IVariable<TType> {

    constructor(name: string, properties: string[], value: any, type: Type<TType>) {
        this.name = name;
        this.properties = properties;
        this.value = value;
        this.type = type;
    }
    readonly name: string;
    readonly properties: string[];
    readonly type: Type<TType>;
    readonly value: any;
}