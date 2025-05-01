import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { GraphQlResponse } from 'src/app/state/person.state';

@Component({
  selector: 'app-ql-response',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './ql-response.component.html',
  styleUrl: './ql-response.component.scss'
})
export class QlResponseComponent implements OnInit, OnChanges {
  @Input() response: GraphQlResponse = {
    data: {}
  };

  protected readonly responseTime: WritableSignal<number> = signal(0);
  protected readonly rows: WritableSignal<number> = signal(0);

  ngOnInit(): void {
    this.setRows();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['response'].currentValue) {
      this.setRows();
    }
  }

  setRows(): void {
    if (!this.response) return;

    let totalRows = 0;
    totalRows += this.getObjectCount(this.response);

    this.rows.set(totalRows - 1);
  }

  getObjectCount(obj: any): number {
    let count = Object.keys(obj).length + 2;

    for (let i in obj) {
      if (obj[i] instanceof Object && !(obj[i] instanceof Array)) {
        count += this.getObjectCount(obj[i]);
      } else if (obj[i] instanceof Array) {
        count += this.getObjectCount(obj[i][0]) * obj[i].length;
      }
    }

    return count;
  }
}
