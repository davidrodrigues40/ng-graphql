import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphQlViewComponent } from './graph-ql-view.component';

describe('GraphQlViewComponent', () => {
  let component: GraphQlViewComponent;
  let fixture: ComponentFixture<GraphQlViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphQlViewComponent]
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
