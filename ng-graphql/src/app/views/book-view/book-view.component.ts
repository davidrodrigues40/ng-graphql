import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
  standalone: true
})
export class BookViewComponent {
  @Input() book?: any;
}
