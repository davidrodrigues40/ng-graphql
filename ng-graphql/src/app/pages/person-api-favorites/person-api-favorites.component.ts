import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { GraphQlMenuComponent } from "../../components/graph-ql-menu/graph-ql-menu.component";
import { QlQueryComponent } from "../../components/ql-query/ql-query.component";
import { Field, Operator, QueryPayload, RequestVariables, SearchQueryBuilder, Variable } from 'query-builder';
import { MatButtonModule } from '@angular/material/button';
import { QlVariablesComponent } from "../../components/ql-variables/ql-variables.component";
import { CommonModule } from '@angular/common';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { GraphQlService } from 'src/app/services/graph-ql/graphql.service';
import { GraphQlResponse, PersonState } from 'src/app/state/person.state';
import { QlResponseComponent } from 'src/app/components/ql-response/ql-response.component';

@Component({
  selector: 'app-person-api-favorites',
  standalone: true,
  imports: [
    GraphQlMenuComponent,
    QlQueryComponent,
    MatButtonModule,
    QlVariablesComponent,
    CommonModule,
    MatTabsModule,
    QlResponseComponent,
  ],
  providers: [
    GraphQlService
  ],
  templateUrl: './person-api-favorites.component.html',
  styleUrl: './person-api-favorites.component.scss'
})
export class PersonApiFavoritesComponent implements OnInit {

  ngOnInit(): void {
    this.getQuery(0);
  }
  private readonly _service: GraphQlService = inject(GraphQlService);
  protected builder: SearchQueryBuilder = new SearchQueryBuilder('persons');
  protected payload: WritableSignal<QueryPayload | undefined> = signal(undefined);
  protected query: WritableSignal<string> = signal('');
  protected variables: WritableSignal<RequestVariables | undefined> = signal(undefined);
  protected response: WritableSignal<GraphQlResponse> = PersonState.persons;
  private readonly searchTermName: string = 'searchTerm';

  protected tabChanged(event: MatTabChangeEvent): void {
    this.getQuery(event.index);
  }

  protected getQuery(type: number): void {
    this.reset();
    switch (type) {
      case 0:
        this.getPersonByLegacyId();
        break;
      case 1:
        this.getPersonByIdentifier();
        break;
      case 2:
        this.getByDodId();
        break;
      case 3:
        this.getByCommonFields();
        break
      default:
        return;
    }

    this.finish();
  }

  private reset(): void {
    this.builder = new SearchQueryBuilder('persons');

  }

  private getPersonByLegacyId(): void {
    this.builder
      .take(10)
      .skip(0)
      .addVariable(new Variable(this.searchTermName, 355, Number))
      .addAndCondition(new Field('legacyPersonId'), Operator.EQ, `$${this.searchTermName}`)
      .return('items.firstName')
      .return('items.lastName')
      .return('items.activeDisplayGradeAndFullName')
      .return('items.activeDodId');
  }

  private getPersonByIdentifier(): void {
    this.builder
      .take(10)
      .skip(0)
      .addVariable(new Variable(this.searchTermName, 'd3fd4a58-8978-4013-996d-02c1455abab1', String))
      .addAndCondition(new Field('personIdentifier'), Operator.EQ, `$${this.searchTermName}`)
      .return('items.firstName')
      .return('items.lastName')
      .return('items.activeDisplayGradeAndFullName');
  }

  private getByDodId(): void {
    this.builder
      .take(10)
      .skip(0)
      .addVariable(new Variable(this.searchTermName, '1234568091', String))
      .addAndCondition(new Field('activeDodId'), Operator.EQ, `$${this.searchTermName}`)
      .return('items.firstName')
      .return('items.lastName')
      .return('items.activeDisplayGradeAndFullName');
  }

  private getByCommonFields(): void {
    this.builder
      .take(10)
      .skip(0)
      .addVariable(new Variable(this.searchTermName, 'bennett', String))
      .addOrCondition(new Field('activeDodId'), Operator.CONTAINS, `$${this.searchTermName}`)
      .addOrCondition(new Field('activeDisplayGradeAndFullName'), Operator.CONTAINS, `$${this.searchTermName}`)
      .return('totalCount')
      .return('items.firstName')
      .return('items.lastName')
      .return('items.activeDisplayGradeAndFullName')
      .return('items.activeDodId');
  }

  private finish(): void {
    const request = this.builder.build();

    this.query.set(request.query);
    this.variables.set(request.variables);

    this._service.Query(request, 'https://localhost/PersonApi/graphql/');
  }

}
