import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { GraphQlMenuComponent } from "../../components/graph-ql-menu/graph-ql-menu.component";
import { QlQueryComponent } from "../../components/ql-query/ql-query.component";
import { Field, Operator, RequestVariables, SearchQueryBuilder, Variable } from 'query-builder';
import { MatButtonModule } from '@angular/material/button';
import { QlVariablesComponent } from "../../components/ql-variables/ql-variables.component";
import { CommonModule } from '@angular/common';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { GraphQlService } from 'src/app/services/graph-ql/graphql.service';
import { GraphQlResponse, PersonState } from 'src/app/state/person.state';
import { QlResponseComponent } from 'src/app/components/ql-response/ql-response.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppState } from 'src/app/state/app.state';
import { FavoritesTabComponent } from './components/favorites-tab/favorites-tab.component';
import { PageTitleComponent } from 'src/app/components/page-title/page-title.component';

@Component({
  selector: 'app-person-api-favorites',
  imports: [
    GraphQlMenuComponent,
    QlQueryComponent,
    MatButtonModule,
    QlVariablesComponent,
    CommonModule,
    MatTabsModule,
    QlResponseComponent,
    MatSlideToggleModule,
    FavoritesTabComponent,
    PageTitleComponent,
  ],
  providers: [
    GraphQlService,
    SearchQueryBuilder
  ],
  templateUrl: './person-api-favorites.component.html',
  styleUrl: './person-api-favorites.component.scss'
})
export class PersonApiFavoritesComponent implements OnInit {

  private readonly _service: GraphQlService = inject(GraphQlService);
  private builder: SearchQueryBuilder = inject(SearchQueryBuilder);

  protected query: WritableSignal<string> = PersonState.query;
  private readonly searchTermName: string = 'searchTerm';

  protected variables: WritableSignal<RequestVariables | undefined> = PersonState.variables;
  protected response: WritableSignal<GraphQlResponse> = PersonState.persons;
  protected currentIndex: WritableSignal<number> = PersonState.tabIndex;
  protected readonly apiEnabled: WritableSignal<boolean> = PersonState.enableApi;
  protected readonly clipboardText: WritableSignal<string> = AppState.clipboardText;

  ngOnInit(): void {
    this.getQuery();
  }

  protected tabChanged(event: MatTabChangeEvent): void {
    this.currentIndex.set(event.index);
    this.getQuery();
  }

  private getQuery(): void {
    this.reset();
    switch (this.currentIndex()) {
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

  protected setApiStatus(): void {
    this.apiEnabled.set(!this.apiEnabled());
    this.getQuery();
  }

  private reset(): void {
    this.builder = new SearchQueryBuilder();
  }

  private getPersonByLegacyId(): void {
    if (!this.builder) return;
    this.builder
      .take(10)
      .skip(0)
      .addVariable(new Variable(this.searchTermName, 355, Number))
      .addAndCondition(new Field('legacyPersonId'), Operator.EQ, `$${this.searchTermName}`)
      .return(['items.firstName', 'items.lastName', 'items.activeDisplayGradeAndFullName', 'items.activeDodId']);
  }

  private getPersonByIdentifier(): void {
    if (!this.builder) return;
    this.builder
      .take(10)
      .skip(0)
      .addVariable(new Variable(this.searchTermName, 'd3fd4a58-8978-4013-996d-02c1455abab1', String))
      .addAndCondition(new Field('personIdentifier'), Operator.EQ, `$${this.searchTermName}`)
      .return('items.activeDisplayGradeAndFullName');
  }

  private getByDodId(): void {
    if (!this.builder) return;
    this.builder
      .take(10)
      .skip(0)
      .addVariable(new Variable(this.searchTermName, '1234568091', String))
      .addAndCondition(new Field('activeDodId'), Operator.EQ, `$${this.searchTermName}`)
      .return(['items.firstName', 'items.lastName', 'items.activeDisplayGradeAndFullName']);
  }

  private getByCommonFields(): void {
    if (!this.builder) return;
    this.builder
      .take(10)
      .skip(0)
      .addVariable(new Variable(this.searchTermName, 'bennett', String))
      .addOrCondition(new Field('activeDodId'), Operator.CONTAINS, `$${this.searchTermName}`)
      .addOrCondition(new Field('activeDisplayGradeAndFullName'), Operator.CONTAINS, `$${this.searchTermName}`)
      .return(['totalCount', 'items.firstName', 'items.lastName', 'items.activeDisplayGradeAndFullName', 'items.activeDodId']);
  }

  private finish(): void {
    if (!this.builder) return;
    const request = this.builder.build('persons');

    this.query.set(request.query);
    this.variables.set(request.variables);
    PersonState.persons.set(GraphQlResponse.emptyResponse());

    if (this.apiEnabled())
      this._service.Query(request, 'https://localhost/PersonApi/graphql/');
  }

}
