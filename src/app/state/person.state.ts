import { signal, WritableSignal } from '@angular/core';
import { GraphQlResponse, QueryPayload } from '@bamtechnologies/force-ng-graphql';

export class PersonState {
   static readonly persons: WritableSignal<GraphQlResponse> = signal(GraphQlResponse.emptyResponse());
   static readonly payload: WritableSignal<QueryPayload | undefined> = signal(undefined);
   static readonly variables: WritableSignal<{ [key: string]: any }> = signal({});
   static readonly query: WritableSignal<string> = signal('');
   static readonly responseTime: WritableSignal<number> = signal(0);
   static readonly enableApi: WritableSignal<boolean> = signal(false);
   static readonly tabIndex: WritableSignal<number> = signal(0);
}