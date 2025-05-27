import { TestBed } from '@angular/core/testing';

import { GraphQlMenuComponent } from './graph-ql-menu.component';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';

describe('GraphQlMenuComponent', () => {
   let component: GraphQlMenuComponent;
   let activatedRoute: jasmine.SpyObj<ActivatedRoute> = jasmine.createSpyObj<ActivatedRoute>('ActivatedRoute', ['snapshot']);
   let router: Router = jasmine.createSpyObj<Router>('Router', ['navigate']);

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         providers: [
            GraphQlMenuComponent,
            provideRouter([
               {
                  path: '',
                  pathMatch: 'full',
                  component: HomeComponent,
               }
            ]),
            { provide: Router, useValue: router },
            { provide: ActivatedRoute, useValue: activatedRoute },
         ]
      })
         .compileComponents();

      component = TestBed.inject(GraphQlMenuComponent);
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});

