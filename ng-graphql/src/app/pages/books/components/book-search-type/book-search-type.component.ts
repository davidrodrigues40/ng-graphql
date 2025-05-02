import { Component, EventEmitter, Output } from '@angular/core';
import { BookSearchType } from 'src/app/enums/book-search-type.enum';

@Component({
    selector: 'app-book-search-type',
    imports: [],
    templateUrl: './book-search-type.component.html',
    styleUrl: './book-search-type.component.scss'
})
export class BookSearchTypeComponent {
  @Output()
  searchTypeChanged: EventEmitter<BookSearchType> = new EventEmitter<BookSearchType>();


  searchType: BookSearchType = BookSearchType.author;
  get searchTypes(): typeof BookSearchType {
    return BookSearchType;
  }
}
