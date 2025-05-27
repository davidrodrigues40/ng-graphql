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