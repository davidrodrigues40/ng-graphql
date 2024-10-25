import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { GraphQlResponse } from "../graphQl/models/graphql-response";
import { GraphQlQuery } from "../graphQl/models/graphql-query";

export abstract class ApiService {
    abstract url: string;
    constructor(private _httpClient: HttpClient) { }

    callApi(query: GraphQlQuery): Observable<any> {
        return this._httpClient.post<GraphQlResponse>(this.url, query)
            .pipe(
                map(response => response.data)
            );
    }
}