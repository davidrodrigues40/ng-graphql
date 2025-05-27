import { signal, WritableSignal } from "@angular/core";

export class QueryBuilderState {
    static readonly query: WritableSignal<string> = signal('no query generated yet');
    static readonly variables: WritableSignal<string> = signal('no variables generated yet');
}