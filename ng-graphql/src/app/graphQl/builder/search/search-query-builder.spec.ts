import { TestBed } from '@angular/core/testing';
import { SearchQueryBuilder } from './search-query-builder';

describe('SearchQueryBuilder', () => {
  let service: SearchQueryBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchQueryBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
