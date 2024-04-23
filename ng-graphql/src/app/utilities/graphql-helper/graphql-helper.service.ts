import { Injectable } from '@angular/core';
import { GraphQlQuery } from 'src/app/models/graphQlquery';
import { InputParameter, Parameter, Query, Variable } from 'src/app/models/query';

@Injectable({
  providedIn: 'root'
})
export class GraphqlHelperService {
  private readonly _queryString: string = 'query {method}({contract}) {{item}({parameters}) {output}}';

  constructor() { }

  GenerateQuery(query: Query): GraphQlQuery {
    const graph: GraphQlQuery = {
      operationName: query.method,
      query: this.formatQueryString(query),
      variables: this.formatVariables(query.inputParameters)
    }

    return graph;
  }

  SetInputParameterValue(parameter: Parameter, value: string): InputParameter {
    return { ...parameter, value: value };
  }

  GenerateParameter(fieldName: string, fieldType: string): Parameter {
    return { field: fieldName, type: fieldType };
  }

  private formatQueryString(query: Query): string {
    //let queryStr: string = `query ${query.method}({contract}) {{item}({parameters}) {output}}`;
    const constractInputs: string[] = [];
    const parameterList: string[] = [];

    for (let index = 0; index < query.inputParameters.length; index++) {
      const element = query.inputParameters[index] as InputParameter;
      constractInputs.push(`$${element.field}:${element.type}!`);
      parameterList.push(`${element.field}:$${element.field}`)
    }
    const queryStr = this._queryString
      .replace('{method}', query.method)
      .replace('{contract}', constractInputs.join(','))
      .replace('{item}', query.objectName)
      .replace('{parameters}', parameterList.join(','))
      .replace('{output}', this.getReturnFields(query.returnFields));

    return queryStr;
  }

  private getReturnFields(fields: string[]): string {
    let output = '{';

    fields.forEach(field => {
      console.log("field", field);
      let subIndex = field.indexOf('.');
      if (subIndex > 0) {
        output += field.substring(0, subIndex);
        console.log('sub', field.substring(subIndex + 1, field.length))
        output += this.getReturnFields([field.substring(subIndex + 1, field.length)])
      }
      else
        output += field;

      output += ',';
    });
    output = output.substring(0, output.length - 1);
    output += '}';

    return output;
  }

  private formatVariables(inputParameters: InputParameter[]): Variable {
    const output: Variable = {};

    inputParameters.forEach(param => {
      output[param.field] = param.value;
    });

    return output;
  }
}
