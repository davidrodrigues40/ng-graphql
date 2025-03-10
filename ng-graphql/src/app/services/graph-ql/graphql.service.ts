import { Injectable } from '@angular/core';
import { ApiService } from '../api-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QueryPayload } from 'src/app/graphQl/models/query-payload';

@Injectable()
export class GraphQlService extends ApiService {
  constructor(private readonly _: HttpClient) { super(_); }

  DoQuery(query: QueryPayload, url: string): Observable<any> {
    return this.callApi(query, url);
  }
}
