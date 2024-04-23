export interface GraphQlQuery {
    query: string;
    variables?: object;
    operationName: string;
}