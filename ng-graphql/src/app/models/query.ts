export interface Query {
    objectName: string;
    returnFields: string[];
    inputParameters: InputParameter[];
    method: string;
}

export interface InputParameter extends Parameter {
    value: string;
}

export interface Parameter {
    field: string;
    type: string;
}

export interface Variable {
    [key: string]: string;
}