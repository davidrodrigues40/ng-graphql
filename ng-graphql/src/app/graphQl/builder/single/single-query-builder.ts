import { QueryPayload } from "src/app/graphQl/models/query-payload";
import { IQueryBuilder } from "../IQueryBuilder";
import { QueryBuilderBase } from "../query-builder-base";

export class SingleQueryBuilder extends QueryBuilderBase implements IQueryBuilder {
  build(): QueryPayload {
    console.log('SingleQueryBuilder.build');
    console.log('where:', this._where);
    console.log('fields:', this._fields);
    return new QueryPayload();
  }
}
