import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { QlQueryComponent } from "../../components/ql-query/ql-query.component";
import { MatButtonModule } from '@angular/material/button';
import { QlVariablesComponent } from "../../components/ql-variables/ql-variables.component";
import { CommonModule } from '@angular/common';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { PersonState } from 'src/app/state/person.state';
import { QlResponseComponent } from 'src/app/components/ql-response/ql-response.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppState } from 'src/app/state/app.state';
import { FavoritesTabComponent } from './components/favorites-tab/favorites-tab.component';
import { PageTitleComponent } from 'src/app/components/page-title/page-title.component';
import {
   Field,
   Operator,
   RequestVariables,
   Variable,
   GraphQlSearchQueryBuilder,
   GraphQlResponse,
} from '@bamtechnologies/force-ng-graphql';
import { PersonSearchService } from 'src/app/services/person/person-search.service';
import { TsViewerComponent } from "../../components/ts-viewer/ts-viewer.component";

@Component({
   selector: 'app-person-api-favorites',
   imports: [
      CommonModule,
      MatTabsModule,
      MatSlideToggleModule,
      QlQueryComponent,
      MatButtonModule,
      QlVariablesComponent,
      QlResponseComponent,
      FavoritesTabComponent,
      PageTitleComponent,
      TsViewerComponent
   ],
   providers: [
      PersonSearchService,
      GraphQlSearchQueryBuilder
   ],
   templateUrl: './person-api-favorites.component.html',
   styleUrl: './person-api-favorites.component.scss'
})
export class PersonApiFavoritesComponent implements OnInit {

   private readonly service: PersonSearchService = inject(PersonSearchService);
   private readonly searchTermName: string = 'searchTerm';

   protected query: WritableSignal<string> = PersonState.query;
   protected variables: WritableSignal<RequestVariables | undefined> = PersonState.variables;
   protected response: WritableSignal<GraphQlResponse> = PersonState.persons;
   protected currentIndex: WritableSignal<number> = PersonState.tabIndex;
   protected readonly apiEnabled: WritableSignal<boolean> = PersonState.enableApi;
   protected readonly clipboardText: WritableSignal<string> = AppState.clipboardText;
   protected readonly builder: GraphQlSearchQueryBuilder = inject(GraphQlSearchQueryBuilder);
   protected tsValue: string = '';

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
            this.search();
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
      this.builder.reset();
   }

   private getPersonByLegacyId(): void {
      if (!this.builder) return;
      this.builder
         .take(10)
         .skip(0)
         .addVariable(Variable.createInstance(this.searchTermName, 355, Number))
         .addAndCondition(Field.createInstance('legacyPersonId'), Operator.EQ, this.searchTermName)
         .return(['items.firstName', 'items.lastName', 'items.activeDisplayGradeAndFullName', 'items.activeDodId']);

      this.tsValue = "this.builder \n   .take(10) \n   .skip(0) \n   .addVariable(Variable.createInstance('searchTerm', 355, Number))\n   .addAndCondition(Field.createInstance('legacyPersonId'), Operator.EQ, 'searchTerm')\n   .return(['items.firstName', 'items.lastName', 'items.activeDisplayGradeAndFullName', 'items.activeDodId'])";
   }

   private getPersonByIdentifier(): void {
      if (!this.builder) return;
      this.builder
         .take(10)
         .skip(0)
         .addVariable(Variable.createInstance(this.searchTermName, 'd3fd4a58-8978-4013-996d-02c1455abab1', String))
         .addAndCondition(Field.createInstance('personIdentifier'), Operator.EQ, this.searchTermName)
         .return('items.activeDisplayGradeAndFullName');

      this.tsValue = "this.builder \n   .take(10) \n   .skip(0) \n   .addVariable(Variable.createInstance('searchTerm', '00000000-0000-0000-0000-000000000000', String))\n   .addAndCondition(Field.createInstance('personIdentifier'), Operator.EQ, 'searchTerm')\n   .return('items.activeDisplayGradeAndFullName')";
   }

   private getByDodId(): void {
      if (!this.builder) return;
      this.builder
         .take(10)
         .skip(0)
         .addVariable(Variable.createInstance(this.searchTermName, '1234568091', String))
         .addAndCondition(Field.createInstance('activeDodId'), Operator.EQ, this.searchTermName)
         .return(['items.firstName', 'items.lastName', 'items.activeDisplayGradeAndFullName']);

      this.tsValue = "this.builder \n   .take(10) \n   .skip(0) \n   .addVariable(Variable.createInstance('searchTerm', '1234568091', String))\n   .addAndCondition(Field.createInstance('activeDodId'), Operator.EQ, 'searchTerm')\n   .return(['items.firstName', 'items.lastName', 'items.activeDisplayGradeAndFullName'])";
   }

   private search(): void {
      if (!this.builder) return;
      this.builder
         .take(10)
         .skip(0)
         .addVariable(Variable.createInstance(this.searchTermName, 'bennett', String))
         .addOrCondition(Field.createInstance('activeDodId'), Operator.CONTAINS, this.searchTermName)
         .addOrCondition(Field.createInstance('activeDisplayGradeAndFullName'), Operator.CONTAINS, this.searchTermName)
         .return(['totalCount', 'items.firstName', 'items.lastName', 'items.activeDisplayGradeAndFullName', 'items.activeDodId']);

      this.tsValue = "this.builder \n   .take(10) \n   .skip(0) \n   .addVariable(Variable.createInstance('searchTerm', 'value', String))\n   .addOrCondition(Field.createInstance('activeDodId'), Operator.CONTAINS, 'searchTerm')\n   .addOrCondition(Field.createInstance('activeDisplayGradeAndFullName'), Operator.CONTAINS, 'searchTerm)\n   .return(['totalCount', 'items.firstName', 'items.lastName', 'items.activeDisplayGradeAndFullName', 'items.activeDodId'])";
   }

   private finish(): void {
      if (!this.builder) return;
      const request = this.builder.build('persons');

      this.query.set(request.query);
      this.variables.set(request.variables);
      PersonState.persons.set(GraphQlResponse.emptyResponse());

      if (this.apiEnabled())
         this.service.search(request);
   }

}
