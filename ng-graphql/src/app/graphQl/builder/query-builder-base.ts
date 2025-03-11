import { Stack } from "src/app/models/stack/stack";
import { Operator } from "../enums/operators";
import { IWhereClause, ICondition } from "../models/clauses";
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

    addOrCondition(field: IField, operator: Operator, value: any): this {
        const condition: ICondition = {
            field: field,
            operator: operator,
            value: value
        };

        this._where.or.push(condition);
        return this;
    }

    addAndCondition(field: IField, operator: Operator, value: any): this {
        const condition: ICondition = {
            field: field,
            operator: operator,
            value: value
        };

        this._where.and.push(condition);
        return this;
    }


    addVariable(variable: IVariable<any>): this {
        this._variables.push(variable);
        return this;
    }

    return(field: string): this;

    return(field: IField): this;

    return(operation: Function): this;

    return(field: any): this {
        switch (typeof field) {
            case 'string':
                this.addStringField(field);
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

    private addStringField(fieldName: string): void {
        let requestedFields: Stack<string> = new Stack<string>();
        let branch: IField | undefined = undefined;
        let hasParent: boolean = false;

        fieldName.split('.').reverse().forEach(subfield => {
            requestedFields.push(subfield);
        });

        let parent: IField | undefined = this._fields.find(f => f.name === requestedFields.peek() as string);
        console.log('parent start', parent);
        if (parent === undefined) {
            parent = new Field(requestedFields.pop() as string);
        }
        else {
            hasParent = true;
            requestedFields.pop();
        }

        while (requestedFields.size() > 0) {
            console.log('size', requestedFields.size());
            console.log('whileBranch', { ...branch });
            if (branch === undefined) {
                branch = parent;
            } else {
                console.log('branch field', { ...branch });
                let existingField: IField | undefined = branch.fields.find(f => f.name === requestedFields.peek() as string);
                console.log('field', requestedFields.peek());
                console.log("existing", { ...existingField });
                if (existingField !== undefined) {
                    branch = existingField;
                    requestedFields.pop();
                }
                else {
                    let field = new Field(requestedFields.pop() as string);
                    branch.addField(field);
                    branch = field;
                }

                console.log('branch', { ...branch });
            }
        }
        console.log('hasParent', hasParent);
        if (!hasParent) this.return(parent);
    }
}