import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Operator } from 'src/app/graphQl/enums/operators';
import { ClauseType } from 'src/app/graphQl/models/clauses';
import { Field } from 'src/app/graphQl/models/field';
import { Variable } from 'src/app/graphQl/models/variable';
import { QueryPayload } from 'src/app/graphQl/models/query-payload';
import { PrettyPipe } from 'src/app/pipes/pretty/pretty.pipe';
import { GraphQlService } from 'src/app/services/graph-ql/graphql.service';
import { SearchQueryBuilder } from 'src/app/graphQl/builder/search/search-query-builder';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graph-ql-view',
  standalone: true,
  imports: [
    MatButtonModule,
    PrettyPipe,
    CommonModule
  ],
  providers: [GraphQlService],
  templateUrl: './graph-ql-view.component.html',
  styleUrl: './graph-ql-view.component.scss'
})
export class GraphQlViewComponent {
  query: string = '';
  request: QueryPayload | undefined = undefined;
  builder: SearchQueryBuilder | undefined = undefined;
  response$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private readonly _service: GraphQlService) { }

  getQuery(): void {
    try {
      this.builder = new SearchQueryBuilder('persons');
      this.builder
        .take(10)
        .skip(0)
        .returnField('totalCount')
        .returnField(() => {
          const pageInfo = new Field('pageInfo');
          pageInfo.addField('hasNextPage');
          pageInfo.addField('hasPreviousPage');
          return pageInfo;
        })
        .returnField(() => {
          const items = new Field('items');
          items.addField('activeDisplayGradeAndFullName');
          items.addField('lastName');
          items.addField('firstName');
          items
            .addField('records')
            .addField('academic')
            .addField('communityCollege')
            .addField('academicStanding');
          return items;
        })
        .addVariable(new Variable('nameTerm', ['activeDisplayGradeAndFullName'], 'Bennett', String))
        .addWhere(new Field('activeDisplayGradeAndFullName'), Operator.CONTAINS, '$nameTerm', ClauseType.OR)

      let request: QueryPayload = this.builder.build();

      this.query = request.query;
      this.request = request;

      this._service.DoQuery(request, 'https://localhost/PersonApi/graphql')
        .subscribe((data: any) => {
          this.response$.next(data);
        });

    } catch (e: any) {
      this.query = e.message;
    }
  }
}
