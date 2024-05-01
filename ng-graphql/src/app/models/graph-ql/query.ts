import { QueryStructures } from "../../graphQl/query-structures";
import { QueryBase, Parameter } from "../common/graph-gl";
import { ContractsParametersVariables, GraphQlRequest } from "../common/graphql-request";
import { GraphQlQuery } from "./graphql-query";

export class Query extends QueryBase {
    qlMethod: string = '';
    parameters: Parameter[] = [];

    graphQlQuery(): GraphQlQuery {
        const cpv: ContractsParametersVariables = GraphQlRequest.generateContract(this.parameters);

        return {
            query: QueryStructures.search
                .replace('{{ql-method}}', this.qlMethod)
                .replace('{{contract}}', cpv.contracts.join(','))
                .replace('{{api-method}}', this.apiMethod)
                .replace('{{parameters}}', cpv.parameters.join(','))
                .replace('{{return-properties}}', this.returnProperties),
            variables: cpv.variables
        }
    }
}

export class AllQuery extends QueryBase {
    objectName: string = '';
    graphQlQuery(): GraphQlQuery {
        return {
            query: QueryStructures.all
                .replace(/{{item-name}}/g, this.objectName)
                .replace('{{return-properties}}', this.returnProperties)
        };
    }
}