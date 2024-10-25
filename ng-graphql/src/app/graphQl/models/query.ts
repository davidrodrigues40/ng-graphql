import { QueryStructures } from '../query-structures';
import { QueryBase, Parameter } from '../abstractions/graph-gl';
import { GraphQlQuery, WhereClause } from './graphql-query';

export interface IQuery {
    queryName: string;
    item: string;
    parameter: Parameter;
    searchTerm: string;
    returnValue: string;
    whereClause: WhereClause;
    returnProperties: string;
}

export class AllQuery extends QueryBase {
    queryName: string = '';
    objectName: string = '';
    graphQlSearch(): GraphQlQuery {
        return {
            query: QueryStructures.all
                .replace(/{{query-name}}/g, this.queryName)
                .replace(/{{item-name}}/g, this.objectName)
                .replace('{{return-properties}}', this.returnProperties)
        };
    }
}