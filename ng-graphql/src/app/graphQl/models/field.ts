export interface IField {
    name: string;
    fields: IField[];
    addField(fieldName: string): IField;
}

export class Field implements IField {
    name: string;
    fields: Field[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addField(fieldName: string): IField {
        const field = new Field(fieldName);
        this.fields.push(field);
        return field;
    }
}