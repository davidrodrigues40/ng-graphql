import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GraphQlQuery } from 'src/app/models/graphQlquery';
import { HttpClient } from '@angular/common/http';
import { GraphQlResponse } from 'src/app/models/graphQlResponse';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private readonly _url: string = 'http://localhost:5000/graphQl';

  constructor(private readonly _client: HttpClient) { }

  GetBook(query: GraphQlQuery): Observable<any> {
    return this._client.post<GraphQlResponse>(this._url, query)
      .pipe(
        map(response => response.data)
      );
  }
}
