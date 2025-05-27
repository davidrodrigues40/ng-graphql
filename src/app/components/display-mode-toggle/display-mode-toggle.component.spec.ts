import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayModeToggleComponent } from './display-mode-toggle.component';

describe('DisplayModeToggleComponent', () => {
  let component: DisplayModeToggleComponent;
  let fixture: ComponentFixture<DisplayModeToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayModeToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayModeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
