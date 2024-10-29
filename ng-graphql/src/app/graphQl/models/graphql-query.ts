import { Variables } from "../abstractions/graph-gl";

export class GraphQlQuery {
    query: string = '';
    variables?: Variables;
}

export class WhereClause {
    field: string = '';
    subClause: WhereClause | null = null;
    term: string = '';
    operator: QueryOperator = QueryOperator.none;
}

export enum QueryOperator {
    none = 'none',
    contains = 'contains',
    equals = 'equals'
}

export namespace QueryOperator {
    export function toQueryValue(operator: QueryOperator): string {
        switch (operator) {
            case QueryOperator.contains:
                return 'contains';
            case QueryOperator.equals:
                return 'eq';
            default:
                return '';
        }
    }
}