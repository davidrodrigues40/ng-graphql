import { IField } from "../../models/field";
import { IBuilderValidationMessage } from "src/app/graphQl/models/builder-validation-message";
import { QueryBuilderException } from "src/app/graphQl/models/query-builder-exception";
import { QueryPayload } from "src/app/graphQl/models/query-payload";
import { QueryBuilderBase } from "../query-builder-base";
import { ISearchQueryBuilder } from "../IQueryBuilder";

export class SearchQueryBuilder extends QueryBuilderBase implements ISearchQueryBuilder {
  private readonly _tab: string = '  ';
  private _whereString: string = '';
  private _take: number = 0;
  private _skip: number = 0;

  build(): QueryPayload {
    const validation: IBuilderValidationMessage = this.validateQuery();
    if (!validation.isValid)
      throw new QueryBuilderException(validation.message);

    this._queryPayload.query = this.buildQueryString();
    this.addVariables();

    return this._queryPayload;
  }

  take(take: number): this {
    this._take = take;
    return this;
  }

  skip(skip: number): this {
    this._skip = skip;
    return this;
  }

  private buildQueryString(): string {
    const query: string = `query search(${this.appendInputVariables()})
{ 
  ${this._name}(
  ${this.appendTake()}
  ${this.appendSkip()}
  ${this.appendWhereClause()})
  ${this.appendFields()}
}`;
    return query;
  }

  private appendTake(): string {
    return `${this.appendTabs(1)}take: ${this._take}`;
  }

  private appendSkip(): string {
    return `${this.appendTabs(1)}skip: ${this._skip}`;
  }

  private addVariables(): void {
    this._variables.forEach(variable => {
      this._queryPayload.variables[variable.name] = variable.value;
    });
  }

  private appendInputVariables(): string {
    let variableArray: string[] = [];

    this._variables.forEach(variable => {
      variableArray.push(`$${variable.name}:${variable.type.name}!`);
    });

    return variableArray.join(',');
  }

  private validateQuery(): IBuilderValidationMessage {
    if (!this._name) {
      return { isValid: false, message: 'Query name is required' };
    }

    if (!this._fields || this._fields.length === 0) {
      return { isValid: false, message: 'At least one field is required' };
    }

    if (!this._variables || this._variables.length === 0) {
      return { isValid: false, message: 'At least one variable is required' };
    }

    return { isValid: true, message: '' };
  }

  private appendFields(): string {
    const fields: IField[] = this._fields;
    let output: string = '{';
    fields.forEach(field => {
      let fieldString: string = '\n';
      output += this.appendFieldString(field, fieldString, 2);
    });
    output += `\n${this.appendTabs(1)}}`;
    return output;
  }

  private appendFieldString(field: IField, output: string, appendLevel: number): string {
    output = output.concat(this.appendTabs(appendLevel)).concat(field.name)

    if (field.fields.length > 0) {
      let innerFields: string = '';
      output += ' { \n';
      field.fields.forEach(f => {
        output += `${this.appendFieldString(f, innerFields, appendLevel + 1)} \n`;
      });
      output += this.appendTabs(appendLevel);
      output += '}';
    }
    return output;
  }

  private appendWhereClause(): string {
    this._whereString = `${this.appendTabs(1)}where: {\n`;
    if (this._where.and.length > 0)
      this.appendAndWhereClause();

    if (this._where.or.length > 0)
      this.appendOrWhereClause();

    this._whereString += `${this.appendTabs(1)}}`;

    return this._whereString;
  }

  private appendAndWhereClause(): void {
    const tabCount: number = 3;
    this._whereString += `${this.appendTabs(tabCount)}`;
    this._whereString += 'and: [ \n';
    this._where.and.forEach(clause => {
      this._whereString += `${this.appendTabs(tabCount + 1)} `;
      this._whereString += `{${clause.field.name}: {${clause.operator}: ${this.getVariableValueString(clause.value)} } } `;
      this._whereString += '\n';
    });
    this._whereString += `${this.appendTabs(tabCount)}] \n`;
  }

  private appendOrWhereClause(): void {
    const tabCount: number = 3;
    this._whereString += `${this.appendTabs(tabCount)}`;
    this._whereString += 'or: [ \n';
    this._where.or.forEach(clause => {
      this._whereString += `${this.appendTabs(tabCount + 1)} `;
      this._whereString += `{${clause.field.name}: {${clause.operator}: ${this.getVariableValueString(clause.value)} } } `;
      this._whereString += `\n`;
    });
    this._whereString += `${this.appendTabs(tabCount)}] \n`;
  }

  private getVariableValueString(value: any): string {
    if (typeof value === 'string' && !value.startsWith('$')) {
      return `"${value}"`;
    }
    return value;
  }

  private appendTabs(level: number): string {
    let tabs: string = '';
    for (let i = 0; i < level; i++) {
      tabs += this._tab;
    }
    return tabs;
  }
}
