import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { GraphQlResponse, QueryPayload } from 'force-ng-graphql';
import { PersonState } from 'src/app/state/person.state';

@Injectable()
export class GraphQlService {
   private readonly _token: string = '';

   constructor(private readonly _httpClient: HttpClient) { }

   Query(query: QueryPayload, url: string): void {
      this._httpClient.post<any>(url, query)
         .pipe(
            catchError(response => {
               return of(response);
            }))
         .subscribe((response: GraphQlResponse) => PersonState.persons.set(response));
   }
}