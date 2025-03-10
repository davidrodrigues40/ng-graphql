
import { SearchQueryBuilder } from './search/search-query-builder';
import { SingleQueryBuilder } from './single/single-query-builder';
import { BuilderType } from '../enums/builder-type';
import { IField } from '../models/field';
import { ClauseType } from '../models/clauses';
import { Operator } from '../enums/operators';
import { IQueryBuilder } from './IQueryBuilder';
import { QueryPayload } from '../models/query-payload';

export class GraphQLBuilder {
  private readonly _builder: IQueryBuilder;

  constructor(private readonly _builderType: BuilderType, private readonly _queryName: string) {
    switch (this._builderType) {
      case BuilderType.QUERY:
        this._builder = new SearchQueryBuilder(this._queryName);
        break;
      case BuilderType.SINGLE:
        this._builder = new SingleQueryBuilder(this._queryName);
        break;
      default:
        throw new Error('Invalid builder type');
    }
  }

  build(): QueryPayload {
    return this._builder.build();
  }

  addReturnField(field: IField): IQueryBuilder {
    // check if the field is already added.  if it is, don't add it again.
    this._builder.addReturnField(field);
    return this._builder;
  }

  addWhere(field: IField, operator: Operator, value: any, clauseType: ClauseType): IQueryBuilder {
    this._builder.addWhere(field, operator, value, clauseType);
    return this._builder;
  }
}
