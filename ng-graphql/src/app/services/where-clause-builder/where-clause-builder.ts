import { Injectable } from '@angular/core';
import { WhereClause } from 'src/app/graphQl/models/graphql-query';

@Injectable({
  providedIn: 'root'
})
export class WhereClauseBuilder {
  private readonly _whereStatement: string = 'where:';

  build(clause: WhereClause): string {
    if (!clause)
      return '';

    if (typeof clause.subClause === 'object')
      return this.buildComplex(clause);
    else
      return this.buildSimple(clause);
  }

  private buildSimple(clause: WhereClause): string {
    return `where: ${this.buildCondition(clause)}`;
  }

  private buildComplex(clause: WhereClause): string {
    const innerClause: WhereClause = clause.subClause as WhereClause;

    return `where: { ${clause.field}: ${this.buildCondition(innerClause)} }`;
  }

  private buildCondition(input: WhereClause) {
    return `{ ${input.field}: { ${input.operator.toString()}: $${input.term}}}`
  }
}
