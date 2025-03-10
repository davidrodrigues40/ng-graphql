import { TestBed } from '@angular/core/testing';
import { GraphQLBuilder } from './graphql-builder';

describe('GraphqlBuilderService', () => {
  let service: GraphQLBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphQLBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
