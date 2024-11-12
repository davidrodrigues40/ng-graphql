import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Book } from 'src/app/graphQl/queryTypes/book';
import { BookViewComponent } from 'src/app/views/book-view/book-view.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    BookViewComponent,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  @Input()
  books: ReadonlyArray<Book> | null = [];
}
