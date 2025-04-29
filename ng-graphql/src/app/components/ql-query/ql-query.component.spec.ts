import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlQueryComponent } from './ql-query.component';

describe('QlQueryComponent', () => {
  let component: QlQueryComponent;
  let fixture: ComponentFixture<QlQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QlQueryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
