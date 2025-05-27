import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GraphQlResponse, QueryPayload } from '@bamtechnologies/force-ng-graphql';
import { PersonState } from 'src/app/state/person.state';

@Injectable()
export class PersonSearchService {
   private readonly httpClient = inject(HttpClient);
   constructor() { }

   search(request: QueryPayload): void {
      this.httpClient.post<GraphQlResponse>('https://localhost/PersonApi/graphql/', request)
         .subscribe(response => PersonState.persons.set(response));
   }
}
