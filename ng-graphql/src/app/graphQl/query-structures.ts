export class QueryStructures {
    static search: string = "query {{query-name}}($term: String!){ {{item}}(where: { author: { {{field}}: { contains: {{term}} } }}) {{return-properties}}}";

    static all: string = "query {{query-name}} {{{item-name}} {{return-properties}}} ";

    static mutation: string = "mutation {{ql-method}}({{contract}}){ {{api-method}}({{parameters}}){{return-properties}}}";
}