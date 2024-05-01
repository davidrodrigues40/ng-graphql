import { GraphQlQuery } from "../graph-ql/graphql-query";

export abstract class GraphQlApiCall {
    apiMethod: string = '';
    abstract graphQlQuery(): GraphQlQuery;
}

export abstract class QueryBase extends GraphQlApiCall {
    returnProperties: string = '';
}

export abstract class GraphQlMutation extends GraphQlApiCall {
    abstract action: 'insert' | 'udate';
    abstract parameter: Parameter;
}

export interface Parameter {
    field: string;
    type: string;
    value: string | number | Date | object
}

export interface Variables {
    [key: string]: string | number | Date | object;
}