import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonByLegacyIdComponent } from './person-by-legacy-id.component';

describe('PersonByLegacyIdComponent', () => {
  let component: PersonByLegacyIdComponent;
  let fixture: ComponentFixture<PersonByLegacyIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonByLegacyIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonByLegacyIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
