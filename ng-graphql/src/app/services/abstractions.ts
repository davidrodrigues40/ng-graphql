import { Observable } from "rxjs";
import { GraphQlQuery } from "../graphQl/models/graphql-query";

export abstract class SearchService {
    abstract Search(query: GraphQlQuery): Observable<any>;
}

export abstract class InsertService {
    abstract Insert(query: GraphQlQuery): Observable<any>;
}