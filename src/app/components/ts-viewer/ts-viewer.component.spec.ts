import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsViewerComponent } from './ts-viewer.component';

describe('TsViewerComponent', () => {
  let component: TsViewerComponent;
  let fixture: ComponentFixture<TsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TsViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
