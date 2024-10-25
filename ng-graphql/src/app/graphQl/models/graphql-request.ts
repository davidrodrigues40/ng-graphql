import { Parameter, Variables } from "../abstractions/graph-gl";

export class GraphQlRequest {
    static generateConsParamsVars(parameters: Parameter[]): ContractsParametersVariables {
        var output: ContractsParametersVariables = new ContractsParametersVariables();

        parameters
            .forEach(parameter => {
                output.contracts.push(`$${parameter.field}: ${parameter.type}!`);
                output.parameters.push(`${parameter.field}:$${parameter.field}`);
                output.variables[parameter.field] = parameter.value;
            });

        return output;
    }
}

export class ContractsParametersVariables {
    contracts: string[] = [];
    parameters: string[] = [];
    variables: Variables = {};
}