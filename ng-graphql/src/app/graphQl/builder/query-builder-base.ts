import { Operator } from "../enums/operators";
import { IWhereClause, ClauseType, IClause } from "../models/clauses";
import { Field, IField } from "../models/field";
import { QueryPayload } from "../models/query-payload";
import { IVariable } from "../models/variable";



export class QueryBuilderBase {
    protected _where: IWhereClause = { or: [], and: [] };
    protected readonly _fields: IField[] = [];
    protected readonly _variables: IVariable<any>[] = [];
    protected readonly _queryPayload: QueryPayload = new QueryPayload();

    get whereClause(): IWhereClause { return this._where; }

    constructor(protected readonly _name: string) { }

    addWhere(field: IField, operator: Operator, value: any, clauseType: ClauseType): this {
        const clause: IClause = {
            field: field,
            operator: operator,
            value: value
        };

        switch (clauseType) {
            case ClauseType.AND:
                this._where.and.push(clause);
                break;
            case ClauseType.OR:
                this._where.or.push(clause);
                break;
            default:
                throw new Error('Invalid clause type');
        }
        return this;
    }

    addVariable(variable: IVariable<any>): this {
        this._variables.push(variable);
        return this;
    }

    returnField(field: string): this;

    returnField(field: IField): this;

    returnField(operation: Function): this;

    returnField(field: IField | string | Function): this {
        switch (typeof field) {
            case 'string':
                this._fields.push(new Field(field));
                break;
            case 'object':
                this._fields.push(field);
                break;
            case 'function':
                this._fields.push(field());
                break;
            default:
                throw new Error('Invalid field type');
        }

        return this;
    }
}