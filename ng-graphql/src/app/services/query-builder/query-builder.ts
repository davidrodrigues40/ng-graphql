import { Injectable } from '@angular/core';
import { Parameter } from 'src/app/graphQl/abstractions/graph-gl';
import { GraphQlQuery, WhereClause } from 'src/app/graphQl/models/graphql-query';
import { WhereClauseBuilder } from '../where-clause-builder/where-clause-builder';
import { IQuery } from 'src/app/graphQl/models/query';
import { QueryStructures } from 'src/app/graphQl/query-structures';

@Injectable({
  providedIn: 'root'
})
export class QueryBuilder implements IQuery {
  queryName: string = '';
  item: string = '';
  parameter?: Parameter
  searchTerm?: string
  returnValue: string = '';
  whereClause?: WhereClause;
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
    if (this.parameter)
      return {
        query: this.buildSearchQuery(),
        variables: { [this.parameter.term]: this.parameter.value }
      }

    return {
      query: this.buildParameterlessQuery()
    }
  }

  private buildParameterlessQuery(): string {
    return QueryStructures.all
      .replace(/{{query-name}}/g, this.queryName)
      .replace(/{{item}}/g, this.item)
      .replace(/{{return-properties}}/g, this.returnProperties);
  }

  private buildSearchQuery(): string {
    if (this.parameter && this.whereClause)
      return QueryStructures.search
        .replace(/{{query-name}}/g, this.queryName)
        .replace(/{{term-name}}/g, this.parameter.term)
        .replace(/{{term-type}}/g, this.parameter.type)
        .replace(/{{item}}/g, this.item)
        .replace(/{{where-clause}}/g, this.whereClauseBuilder.build(this.whereClause))
        .replace(/{{return-properties}}/g, this.returnProperties);

    throw new Error('Invalid request');
  }
}
