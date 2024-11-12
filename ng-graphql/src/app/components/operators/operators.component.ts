import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QueryOperator } from 'src/app/enums/query-operator.enum';

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [],
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.scss'
})
export class OperatorsComponent {
  @Input()
  initialValue: QueryOperator = QueryOperator.equals;

  @Output()
  operatorChanged: EventEmitter<QueryOperator> = new EventEmitter<QueryOperator>();

  operator: QueryOperator = QueryOperator.equals;

  get operators(): typeof QueryOperator {
    return QueryOperator;
  }
}
