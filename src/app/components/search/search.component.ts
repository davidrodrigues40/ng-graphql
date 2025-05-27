import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-search',
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
    ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Input()
  searchType: string = '';
  @Input()
  placeHolder: string = 'Search';
  @Input()
  searchTerm!: string;

  @Output()
  keyUp: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
  @Output()
  searchClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  clearSearch: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  searchTermChange: EventEmitter<string> = new EventEmitter<string>();

  onKeyUp(event: KeyboardEvent): void {
    this.searchTermChange.emit(this.searchTerm);
    this.keyUp.emit(event);
  }
}
