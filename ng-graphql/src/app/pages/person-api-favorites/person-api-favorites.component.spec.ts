import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonApiFavoritesComponent } from './person-api-favorites.component';

describe('PersonApiFavoritesComponent', () => {
  let component: PersonApiFavoritesComponent;
  let fixture: ComponentFixture<PersonApiFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonApiFavoritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonApiFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
