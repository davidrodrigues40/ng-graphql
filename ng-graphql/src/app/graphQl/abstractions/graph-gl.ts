import { GraphQlQuery } from "../models/graphql-query";

export abstract class GraphQlApiCall {
    apiMethod: string = '';
    abstract graphQlSearch(): GraphQlQuery;
}

export abstract class QueryBase extends GraphQlApiCall {
    returnProperties: string = '';
}

export abstract class GraphQlMutation extends GraphQlApiCall {
    abstract action: 'insert' | 'udate';
    abstract parameter: Parameter;
}

export interface Parameter {
    term: string;
    field: string;
    type: string;
    value: string | object | undefined
}

export interface Variables {
    [key: string]: string | object | undefined;
}