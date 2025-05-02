import { CommonModule } from '@angular/common';
import { Component, inject, signal, Type, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  Field,
  Operator,
  QueryPayload,
  SEARCH_QUERY_NAME,
  SearchQueryBuilder,
  Variable
} from 'query-builder';
import { GraphQlService } from 'src/app/services/graph-ql/graphql.service';
import { SearchTypeSelectorComponent } from '../search-type-selector/search-type-selector.component';
import { QlQueryComponent } from '../ql-query/ql-query.component';
import { QlVariablesComponent } from "../ql-variables/ql-variables.component";
import { QlResponseComponent } from '../ql-response/ql-response.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GraphQlResponse, PersonState } from 'src/app/state/person.state';
@Component({
    selector: 'app-query-builder',
    imports: [
        MatButtonModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatChipsModule,
        MatIconModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatSelectModule,
        SearchTypeSelectorComponent,
        QlQueryComponent,
        QlVariablesComponent,
        QlResponseComponent,
        MatSnackBarModule,
    ],
    providers: [
        GraphQlService,
        { provide: SEARCH_QUERY_NAME, useValue: 'persons' },
        SearchQueryBuilder,
    ],
    templateUrl: './query-builder.component.html',
    styleUrl: './query-builder.component.scss'
})
export class QueryBuilderComponent {

  take: number = 10;
  skip: number = 0;
  query: string = '';
  fieldName: string = '';
  fieldNames: string[] = [];
  searchTerm: string = '';
  request: QueryPayload | undefined = undefined;
  openedPanel$: WritableSignal<number> = signal(0);
  enableApi: boolean = false;
  apiUrl: string = 'https://localhost/PersonApi/graphql';
  searchTermTypes: Type<String | Number>[] = [String, Number];
  searchTermType: Type<String | Number> = String;
  searchField: string = '';
  searchVariables: Variable<String | Number>[] = [];
  rows: number = 0;
  response: WritableSignal<GraphQlResponse> = PersonState.persons;
  builder: SearchQueryBuilder = inject(SearchQueryBuilder);

  constructor(private readonly _service: GraphQlService) { }

  getQuery(): void {
    try {
      let term: string | number = this.searchTermType === Number ? Number(this.searchTerm) : this.searchTerm;

      this.builder
        .take(this.take)
        .skip(this.skip)
        .addVariable(new Variable('searchTerm', term, this.searchTermType))
        .addAndCondition(new Field(this.searchField), Operator.EQ, '$searchTerm');

      this.fieldNames.forEach(fieldName => {
        this.builder.return(fieldName);
      });
      let request: QueryPayload = this.builder.build('persons');

      this.query = request.query;
      this.request = request;

      this.rows = request.query.split('\n').length;

      if (this.enableApi)
        this._service.Query(request, this.apiUrl);
      else
        this.openedPanel$.set(1);
    } catch (e: any) {
      this.query = e.message;
    }
  }

  fieldKeyPressed(event: KeyboardEvent): void {
    if (event.key === 'Enter')
      this.addField();
  }

  addField(): void {
    this.fieldNames.push(this.fieldName);
    this.fieldName = '';
  }

  removeField(fieldName: string): void {
    this.fieldNames = this.fieldNames.filter(x => x !== fieldName);
  }

  removeSearchTerm(variable: Variable<String | Number>): void {
    this.searchVariables = this.searchVariables.filter(x => x !== variable);
  }

  clear(): void {
    this.query = '';
    this.request = undefined;
    this.fieldName = '';
    this.fieldNames = [];
    this.take = 10;
    this.skip = 0;
    this.openedPanel$.set(0);
  }

  searchTermTypeChanged(type: Type<String | Number>): void {
    this.searchTermType = type;
  }
}