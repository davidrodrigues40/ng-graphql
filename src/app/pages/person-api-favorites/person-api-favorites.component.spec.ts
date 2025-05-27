import { PersonApiFavoritesComponent } from './person-api-favorites.component';
import { MockComponent } from 'ng-mocks';
import { PageTitleComponent } from 'src/app/components/page-title/page-title.component';
import { QlQueryComponent } from 'src/app/components/ql-query/ql-query.component';
import { QlResponseComponent } from 'src/app/components/ql-response/ql-response.component';
import { QlVariablesComponent } from 'src/app/components/ql-variables/ql-variables.component';
import { FavoritesTabComponent } from './components/favorites-tab/favorites-tab.component';
import { TestBed } from '@angular/core/testing';
import { PersonSearchService } from 'src/app/services/person/person-search.service';
import { GraphQlSearchQueryBuilder } from '@bamtechnologies/force-ng-graphql';

describe('PersonApiFavoritesComponent', () => {
   let component: PersonApiFavoritesComponent;
   let personSearchService = jasmine.createSpyObj<PersonSearchService>('PersonSearchService', ['search']);
   let searchQueryBuilder = jasmine.createSpyObj<GraphQlSearchQueryBuilder>('SearchQueryBuilder', ['build']);

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [
            MockComponent(QlQueryComponent),
            MockComponent(QlResponseComponent),
            MockComponent(QlVariablesComponent),
            MockComponent(FavoritesTabComponent),
            MockComponent(PageTitleComponent),
         ],
         providers: [
            PersonApiFavoritesComponent,
            { provide: PersonSearchService, useValue: personSearchService },
            { provide: GraphQlSearchQueryBuilder, useValue: searchQueryBuilder },
         ],
      }).compileComponents();

      component = TestBed.inject(PersonApiFavoritesComponent);
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
