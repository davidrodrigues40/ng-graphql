import { TestBed } from '@angular/core/testing';

import { GraphqlHelperService } from './graphql-helper.service';

describe('GraphqlHelperService', () => {
  let service: GraphqlHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphqlHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
