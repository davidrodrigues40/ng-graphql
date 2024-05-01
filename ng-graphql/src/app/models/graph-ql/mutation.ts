import { QueryStructures } from "src/app/graphQl/query-structures";
import { QueryBase, GraphQlMutation, Parameter } from "../common/graph-gl";
import { GraphQlQuery } from "./graphql-query";
import { ContractsParametersVariables, GraphQlRequest } from "../common/graphql-request";

export class Mutation extends QueryBase implements GraphQlMutation {
    parameter!: Parameter;
    readonly action: 'insert' | 'udate' = 'insert';

    graphQlQuery(): GraphQlQuery {
        const cpv: ContractsParametersVariables = GraphQlRequest.generateContract([this.parameter]);
        console.log("cpv", cpv);
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