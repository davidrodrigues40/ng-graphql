import { signal, WritableSignal } from '@angular/core';

export class GraphQlResponse {
    data: { [key: string]: any } = {};

    static emptyResponse(): GraphQlResponse {
        return {
            data: {}
        };
    }
}

export class PersonState {

    static readonly persons: WritableSignal<GraphQlResponse> = signal(GraphQlResponse.emptyResponse());
}