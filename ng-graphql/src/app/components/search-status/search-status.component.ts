import { Component, Input } from '@angular/core';
import { QueryOperator } from 'src/app/enums/query-operator.enum';

@Component({
  selector: 'app-search-status',
  standalone: true,
  imports: [],
  templateUrl: './search-status.component.html',
  styleUrl: './search-status.component.scss'
})
export class SearchStatusComponent {
  @Input() searchType!: string;
  @Input() operator!: QueryOperator;
  @Input() searchTerm!: string;
  @Input() count!: number;
}
