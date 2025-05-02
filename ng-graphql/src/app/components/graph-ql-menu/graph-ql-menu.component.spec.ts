import { TestBed } from '@angular/core/testing';

import { GraphQlMenuComponent } from './graph-ql-menu.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MockBuilder, MockRender } from 'ng-mocks';

fdescribe('GraphQlMenuComponent', () => {
  let component: GraphQlMenuComponent;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute> = jasmine.createSpyObj<ActivatedRoute>('ActivatedRoute', ['snapshot']);
  let router: Router = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule(
      MockBuilder(GraphQlMenuComponent)
        .mock(ActivatedRoute, activatedRoute)
        .mock(Router, router)
        .build())
      .compileComponents();

    component = MockRender(GraphQlMenuComponent).point.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
