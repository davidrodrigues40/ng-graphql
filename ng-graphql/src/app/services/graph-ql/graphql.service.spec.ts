import { TestBed } from '@angular/core/testing';

import { GraphQlService } from './graphql.service';
import { HttpClient } from '@angular/common/http';
import { MockBuilder } from 'ng-mocks';

describe('GraphqlSearchService', () => {
  let service: GraphQlService;
  let httpClient: HttpClient = jasmine.createSpyObj<HttpClient>('HttpClient', ['post']);

  beforeEach(() => {
    TestBed.configureTestingModule(
      MockBuilder(GraphQlService)
        .keep(GraphQlService)
        .mock(HttpClient, httpClient)
        .build()
    );

    service = TestBed.inject(GraphQlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
