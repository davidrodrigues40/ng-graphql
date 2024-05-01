import { Injectable } from '@angular/core';
import { ApiService } from '../api-service';
import { HttpClient } from '@angular/common/http';
import { GraphQlQuery } from 'src/app/models/graph-ql/graphql-query';
import { Observable } from 'rxjs';

@Injectable()
export class GraphQlService extends ApiService {
  url: string = 'http://localhost:5000/graphQl';

  constructor(private _: HttpClient) { super(_); }

  DoQuery(query: GraphQlQuery): Observable<any> {
    return this.callApi(query);
  }
}
