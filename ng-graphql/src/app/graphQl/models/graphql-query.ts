import { QueryOperator } from "src/app/enums/query-operator.enum";
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