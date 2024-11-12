import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSearchTypeComponent } from './book-search-type.component';

describe('BookSearchTypeComponent', () => {
  let component: BookSearchTypeComponent;
  let fixture: ComponentFixture<BookSearchTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookSearchTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookSearchTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
