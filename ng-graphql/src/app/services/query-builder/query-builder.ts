import { Injectable } from '@angular/core';
import { Parameter } from 'src/app/graphQl/abstractions/graph-gl';
import { GraphQlQuery, QueryOperator, WhereClause } from 'src/app/graphQl/models/graphql-query';
import { WhereClauseBuilder } from '../where-clause-builder/where-clause-builder';
import { IQuery } from 'src/app/graphQl/models/query';

@Injectable({
  providedIn: 'root'
})
export class QueryBuilder implements IQuery {
  queryName: string = '';
  item: string = '';
  parameter: Parameter = {
    term: '',
    field: '',
    type: '',
    value: ''
  };
  searchTerm: string = '';
  returnValue: string = '';
  whereClause: WhereClause = {
    field: '',
    subClause: '',
    term: '',
    operator: QueryOperator.none
  };
  returnProperties: string = '';

  constructor(private readonly whereClauseBuilder: WhereClauseBuilder) { }

  loadBuilder(builder: IQuery) {
    this.item = builder.item;
    this.parameter = builder.parameter;
    this.queryName = builder.queryName;
    this.returnValue = builder.returnValue;
    this.returnProperties = builder.returnProperties;
    this.searchTerm = builder.searchTerm;
    this.whereClause = builder.whereClause;
  }

  buildQuery(): GraphQlQuery {
    return {
      query: this.buildInnerQuery(),
      variables: { [this.parameter.term]: this.parameter.value }
    }
  }

  private buildInnerQuery(): string {
    return `query ${this.queryName}($${this.parameter.term}: ${this.parameter.type}) { ${this.item}(${this.whereClauseBuilder.build(this.whereClause)}) ${this.returnProperties}}`;
  }
}
