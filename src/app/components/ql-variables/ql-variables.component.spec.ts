import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlVariablesComponent } from './ql-variables.component';

describe('QlVariablesComponent', () => {
  let component: QlVariablesComponent;
  let fixture: ComponentFixture<QlVariablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QlVariablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
