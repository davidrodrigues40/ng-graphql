import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlResponseComponent } from './ql-response.component';

describe('QlResponseComponent', () => {
  let component: QlResponseComponent;
  let fixture: ComponentFixture<QlResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QlResponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
