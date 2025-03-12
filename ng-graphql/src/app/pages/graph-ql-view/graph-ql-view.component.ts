import { Component, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PrettyPipe } from 'src/app/pipes/pretty/pretty.pipe';
import { GraphQlService } from 'src/app/services/graph-ql/graphql.service';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { Field, Operator, QueryPayload, SearchQueryBuilder, Variable } from 'query-builder';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
    MatSlideToggleModule
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
  apiUrl: string = 'https://localhost/PersonApi/graphql';

  constructor(private readonly _service: GraphQlService) { }

  getQuery(): void {
    try {
      this.builder = new SearchQueryBuilder('persons');

      this.builder
        .take(this.take)
        .skip(this.skip)
        .addVariable(new Variable('searchTerm', this.searchTerm, String))
        .addVariable(new Variable('coreType', 'military', String))
        .addOrCondition(new Field('activeDisplayGradeAndFullName'), Operator.CONTAINS, '$searchTerm')
        .addOrCondition(new Field('activeDodId'), Operator.CONTAINS, '$searchTerm')
        .addAndCondition(new Field('activeCoreType'), Operator.EQ, '$coreType');

      this.fieldNames.forEach(fieldName => {
        this.builder.return(fieldName);
      });

      let request: QueryPayload = this.builder.build();

      this.query = request.query;
      this.request = request;

      if (this.enableApi)
        this._service.Query(request, 'https://localhost/PersonApi/graphql')
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

  setOpenedPanel(index: number): void {
    this.openedPanel$.set(index);
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
