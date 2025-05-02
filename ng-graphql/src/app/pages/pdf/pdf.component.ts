import { Component, OnInit } from '@angular/core';
import { PdfState } from 'src/app/state/pdf/pdf-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Person } from 'src/app/services/pdf/person';
import * as selectors from 'src/app/state/pdf/pdf-selectors';
import * as actions from 'src/app/state/pdf/pdf-actions';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pdf',
    imports: [
        CommonModule
    ],
    templateUrl: './pdf.component.html',
    styleUrl: './pdf.component.scss'
})
export class PdfComponent implements OnInit {
  constructor(private readonly _state: Store<PdfState>) { }

  person: Observable<Person> = this._state.select(selectors.person);

  ngOnInit(): void {
    this._state.dispatch(actions.pdfActions.getPersonById({ id: 388811 }));
  }
}
