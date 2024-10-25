import { TestBed } from '@angular/core/testing';
import { WhereClauseBuilder } from './where-clause-builder';

describe('WhereClauseBuilderService', () => {
  let service: WhereClauseBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhereClauseBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
