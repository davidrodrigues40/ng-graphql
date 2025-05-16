import { TestBed } from '@angular/core/testing';

import { PersonSearchService } from './person-search.service';
import { HttpClient } from '@angular/common/http';

describe('PersonSearchService', () => {
   let service: PersonSearchService;
   let httpClient = jasmine.createSpyObj('HttpClient', ['post']);

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [
            PersonSearchService,
            { provide: HttpClient, useValue: httpClient },
         ]
      });
      service = TestBed.inject(PersonSearchService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });
});
