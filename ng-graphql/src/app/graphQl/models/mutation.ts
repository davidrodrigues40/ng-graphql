import { QueryStructures } from "src/app/graphQl/query-structures";
import { QueryBase, GraphQlMutation, Parameter } from "../abstractions/graph-gl";
import { GraphQlQuery } from "./graphql-query";
import { ContractsParametersVariables, GraphQlRequest } from "./graphql-request";

export class Mutation extends QueryBase implements GraphQlMutation {
    parameter!: Parameter;
    readonly action: 'insert' | 'udate' = 'insert';

    graphQlSearch(): GraphQlQuery {
        const cpv: ContractsParametersVariables = GraphQlRequest.generateConsParamsVars([this.parameter]);

        return {
            query: QueryStructures.mutation
                .replace('{{ql-method}}', this.action)
                .replace('{{contract}}', cpv.contracts[0])
                .replace('{{api-method}}', this.apiMethod)
                .replace('{{parameters}}', cpv.parameters.join(','))
                .replace('{{return-properties}}', this.returnProperties),
            variables: cpv.variables
        }
    }
}