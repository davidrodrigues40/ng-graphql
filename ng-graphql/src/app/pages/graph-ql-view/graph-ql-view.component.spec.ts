import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphQlViewComponent } from './graph-ql-view.component';
import { MockComponent } from 'ng-mocks';
import { GraphQlMenuComponent } from 'src/app/components/graph-ql-menu/graph-ql-menu.component';
import { QueryBuilderComponent } from 'src/app/components/query-builder/query-builder.component';

describe('GraphQlViewComponent', () => {
   let component: GraphQlViewComponent;
   let fixture: ComponentFixture<GraphQlViewComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [
            GraphQlViewComponent,
            MockComponent(GraphQlMenuComponent),
            MockComponent(QueryBuilderComponent)
         ]
      })
         .compileComponents();

      fixture = TestBed.createComponent(GraphQlViewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
