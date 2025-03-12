import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { QueryPayload } from 'query-builder';

@Injectable()
export class GraphQlService {
  private readonly _token: string = `Bearer ${localStorage.getItem('token')}`;

  constructor(private readonly _httpClient: HttpClient) { }

  Query(query: QueryPayload, url: string): Observable<any> {
    return this._httpClient.post<any>(url, query)
      .pipe(
        map(response => {
          return response
        }),
        catchError(response => {
          return of(response);
        })
      );
  }
}
