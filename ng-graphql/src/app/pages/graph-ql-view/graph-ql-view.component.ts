import { Component, signal, Type, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PrettyPipe } from 'src/app/pipes/pretty/pretty.pipe';
import { GraphQlService } from 'src/app/services/graph-ql/graphql.service';
import { BehaviorSubject } from 'rxjs';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { Field, Operator, QueryPayload, RequestVariables, SearchQueryBuilder, Variable } from 'query-builder';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

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
    MatIconModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatSelectModule
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
  openedPanel$: WritableSignal<number> = signal(0);
  enableApi: boolean = false;
  apiUrl: string = 'https://myvector-dev.a1tde.net/PersonApi/graphql';
  searchTermTypes: Type<String | Number>[] = [String, Number];
  searchTermType: Type<String | Number> = String;
  searchField: string = '';
  searchVariables: Variable<String | Number>[] = [];
  rows: number = 0;

  private pretty: JsonPipe = new JsonPipe();

  constructor(private readonly _service: GraphQlService) { }

  getQuery(): void {
    try {
      let term: string | number = this.searchTermType === Number ? Number(this.searchTerm) : this.searchTerm;
      this.builder = new SearchQueryBuilder('persons');

      this.builder
        .take(this.take)
        .skip(this.skip)
        .addVariable(new Variable('searchTerm', term, this.searchTermType))
        .addAndCondition(new Field(this.searchField), Operator.EQ, '$searchTerm');

      this.fieldNames.forEach(fieldName => {
        this.builder.return(fieldName);
      });
      let request: QueryPayload = this.builder.build();

      this.query = request.query;
      this.request = request;

      this.rows = request.query.split('\n').length;

      if (this.enableApi)
        this._service.Query(request, this.apiUrl)
          .subscribe((response: any) => {
            if (response.error)
              this.response$.next({ error: response.error.errors[0].message });
            else
              this.response$.next(response.data);

            this.openedPanel$.set(3);
          });
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

  setOpenedPanel(index: number): void {
    this.openedPanel$.set(index);
  }

  copyToClipboard(value: string | undefined): void {
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => {
      alert('Copied to clipboard');
    });
  }

  copyVariableToClipboard(variable: RequestVariables | undefined): void {
    if (!variable) return;
    navigator.clipboard.writeText(this.pretty.transform(variable)).then(() => {
      alert('Copied to clipboard');
    });
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
    this.openedPanel$.set(0);
  }
}
