import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryBuilderComponent } from './query-builder.component';
import { GraphQlSearchQueryBuilder } from 'force-ng-graphql';
import { HttpClient } from '@angular/common/http';
import { PersonSearchService } from 'src/app/services/person/person-search.service';

describe('QueryBuilderComponent', () => {
   let component: QueryBuilderComponent;
   let fixture: ComponentFixture<QueryBuilderComponent>;
   let httpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
   let searchService = jasmine.createSpyObj('PersonSearchService', ['search']);

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         providers: [
            QueryBuilderComponent,
            GraphQlSearchQueryBuilder,
            { provide: HttpClient, useValue: httpClient },
            { provide: PersonSearchService, useValue: searchService },
         ],
      })
         .compileComponents();

      fixture = TestBed.createComponent(QueryBuilderComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
