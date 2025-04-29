import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphQlMenuComponent } from './graph-ql-menu.component';

describe('GraphQlMenuComponent', () => {
  let component: GraphQlMenuComponent;
  let fixture: ComponentFixture<GraphQlMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphQlMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphQlMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
