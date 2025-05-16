import { PersonApiFavoritesComponent } from './person-api-favorites.component';
import { PersonState } from 'src/app/state/person.state';
import { GraphQlService } from 'src/app/services/graph-ql/graphql.service';
import { GraphQlSearchQueryBuilder } from 'force-ng-graphql';
import { MockBuilder, MockRender } from 'ng-mocks';

describe('PersonApiFavoritesComponent', () => {
   let component: PersonApiFavoritesComponent;
   let graphQlService = jasmine.createSpyObj<GraphQlService>('GraphQlService', ['Query']);
   let searchQueryBuilder = jasmine.createSpyObj<GraphQlSearchQueryBuilder>('SearchQueryBuilder', ['build']);

   beforeEach(async () => {
      await MockBuilder(PersonApiFavoritesComponent)
         .mock(GraphQlService, graphQlService)
         .mock(GraphQlSearchQueryBuilder, searchQueryBuilder)

      component = MockRender(PersonApiFavoritesComponent).point.componentInstance;
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should have a query', () => {

      PersonState.query.set('query');

      expect(PersonState.query()).toBe('query');
   });

   it('should have empty state', () => {
      PersonState.query.update(() => '');
      expect(PersonState.query()).toEqual('');
   });
});
