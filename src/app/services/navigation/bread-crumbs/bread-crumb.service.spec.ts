import { TestBed } from '@angular/core/testing';

import { BreadCrumbService } from './bread-crumb.service';

describe('BreadCrumbService', () => {
   let service: BreadCrumbService;

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [BreadCrumbService]
      });
      service = TestBed.inject(BreadCrumbService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });
});
