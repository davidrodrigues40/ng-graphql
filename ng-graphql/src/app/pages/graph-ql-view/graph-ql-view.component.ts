import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Operator } from 'src/app/graphQl/enums/operators';
import { Field } from 'src/app/graphQl/models/field';
import { Variable } from 'src/app/graphQl/models/variable';
import { QueryPayload } from 'src/app/graphQl/models/query-payload';
import { PrettyPipe } from 'src/app/pipes/pretty/pretty.pipe';
import { GraphQlService } from 'src/app/services/graph-ql/graphql.service';
import { SearchQueryBuilder } from 'src/app/graphQl/builder/search/search-query-builder';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-graph-ql-view',
  standalone: true,
  imports: [
    MatButtonModule,
    PrettyPipe,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatChipsModule,
    MatIconModule
  ],
  providers: [GraphQlService],
  templateUrl: './graph-ql-view.component.html',
  styleUrl: './graph-ql-view.component.scss'
})
export class GraphQlViewComponent {
  take: number = 10;
  skip: number = 0;
  query: string = '';
  fieldName: string = '';
  fieldNames: string[] = [];
  searchTerm: string = '';
  request: QueryPayload | undefined = undefined;
  builder: SearchQueryBuilder = new SearchQueryBuilder('persons');
  response$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private readonly _service: GraphQlService) { }

  getQuery(): void {
    try {
      console.log('searchTerm', this.searchTerm);
      this.builder
        .take(this.take)
        .skip(this.skip)
        .addVariable(new Variable('searchTerm', this.searchTerm, String))
        .addVariable(new Variable('coreType', 'military', String))
        .addOrCondition(new Field('activeDisplayGradeAndFullName'), Operator.CONTAINS, '$searchTerm')
        .addOrCondition(new Field('activeDodId'), Operator.CONTAINS, '$searchTerm')
        .addAndCondition(new Field('activeCoreType'), Operator.EQ, '$coreType');

      let request: QueryPayload = this.builder.build();

      this.query = request.query;
      this.request = request;

      this._service.Query(request, 'https://localhost/PersonApi/graphql')
        .subscribe((data: any) => {
          this.response$.next(data);
        });

    } catch (e: any) {
      this.query = e.message;
    }

    this.builder = new SearchQueryBuilder('persons');
    this.fieldNames.forEach(element => {
      this.builder.return(element);
    });
  }

  addField(): void {
    this.builder.return(this.fieldName)
    this.fieldNames.push(this.fieldName);
    this.fieldName = '';
  }

  clear(): void {
    this.query = '';
    this.request = undefined;
    this.response$.next(null);
    this.fieldName = '';
    this.fieldNames = [];
    this.take = 10;
    this.skip = 0;
    this.builder = new SearchQueryBuilder('persons');
  }
}
