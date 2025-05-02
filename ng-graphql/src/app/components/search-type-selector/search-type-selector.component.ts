import { Component, EventEmitter, Output, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-search-type-selector',
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        FormsModule
    ],
    templateUrl: './search-type-selector.component.html',
    styleUrl: './search-type-selector.component.scss'
})
export class SearchTypeSelectorComponent {
  @Output() searchTermTypeChanged: EventEmitter<Type<String | Number>> = new EventEmitter<Type<String | Number>>();

  protected searchTermTypes: Type<String | Number>[] = [String, Number];

  protected selectionChanged(event: MatSelectChange) {
    this.searchTermTypeChanged.emit(event.value as Type<String | Number>);
  }
}
