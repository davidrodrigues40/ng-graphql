import { Variables } from "../abstractions/graph-gl";

export class GraphQlQuery {
    query: string = '';
    variables?: Variables;
}

export class WhereClause {
    field: string = '';
    subClause: string | WhereClause | null = '';
    term: string = '';
    operator: QueryOperator = QueryOperator.none;
}

export enum QueryOperator {
    none = 'none',
    contains = 'contains',
    equals = 'eq'
}


//query getBooksByAuthor($term: String!) { books(where: { author: { name: { contains: $term}}) {id,title,author{firstName,lastName}}}
