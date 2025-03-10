import { TestBed } from '@angular/core/testing';
import { SingleQueryBuilder } from './single-query-builder';

describe('SingleQueryBuilder', () => {
  let service: SingleQueryBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleQueryBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
