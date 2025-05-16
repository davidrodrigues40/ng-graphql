import { TestBed } from '@angular/core/testing';

import { PdfService } from './pdf.service';
import { HttpClient } from '@angular/common/http';

describe('PdfService', () => {
   let service: PdfService;
   let httpClient = jasmine.createSpyObj('HttpClient', ['get']);

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [PdfService,
            { provide: HttpClient, useValue: httpClient }
         ]
      });
      service = TestBed.inject(PdfService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });
});
