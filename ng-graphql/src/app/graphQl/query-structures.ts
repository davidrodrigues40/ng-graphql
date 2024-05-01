export class QueryStructures {
    static search: string = `query {{ql-method}}({{contract}}){ {{api-method}}({{parameters}}) {{return-properties}}}`;

    static all: string = `query {{{item-name}} {{return-properties}}}`;

    static mutation: string = `mutation {{ql-method}}({{contract}}){ {{api-method}}({{parameters}}){{return-properties}}}`;
}