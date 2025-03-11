export interface IField {
    get name(): string;
    get fields(): ReadonlyArray<IField>;
    addField(field: string): IField;
    addField(field: IField): IField;
}

export class Field implements IField {
    private readonly _fields: IField[] = [];
    get name(): string { return this._name; };
    get fields(): ReadonlyArray<IField> { return this._fields; };

    constructor(private readonly _name: string) {
    }
    addField(field: IField): IField
    addField(field: string): IField;

    addField(field: IField | string): IField {
        let returnField: IField;
        if (typeof field === 'string') {
            returnField = new Field(field);
            this._fields.push(returnField);
        } else {
            returnField = field;
            this._fields.push(field);
        }
        return returnField;
    }
}