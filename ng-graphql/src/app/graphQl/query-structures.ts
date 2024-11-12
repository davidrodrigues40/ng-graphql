export class QueryStructures {
    static readonly search: string = "query {{query-name}}(${{term-name}}:{{term-type}}){ {{item}}({{where-clause}}) {{return-properties}}}";

    static readonly all: string = "query {{query-name}} {{{item}} {{return-properties}}} ";

    static readonly mutation: string = "mutation {{ql-method}}({{contract}}){ {{api-method}}({{parameters}}){{return-properties}}}";
}