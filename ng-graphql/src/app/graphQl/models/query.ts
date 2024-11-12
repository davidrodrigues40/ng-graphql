import { Parameter } from '../abstractions/graph-gl';
import { WhereClause } from './graphql-query';

export interface IQuery {
    queryName: string;
    item: string;
    parameter?: Parameter;
    searchTerm?: string;
    returnValue: string;
    whereClause?: WhereClause;
    returnProperties: string;
}