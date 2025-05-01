import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RequestVariables } from 'query-builder';
import { CopyComponent } from '../copy/copy.component';

@Component({
  selector: 'app-ql-variables',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    CopyComponent,
    CommonModule
  ],
  templateUrl: './ql-variables.component.html',
  styleUrl: './ql-variables.component.scss'
})
export class QlVariablesComponent {
  @Input() variables: RequestVariables | undefined = undefined;

  private readonly pretty: JsonPipe = new JsonPipe();
  private readonly _snackbar = inject(MatSnackBar);

  getVariablesAsString(variable: RequestVariables | undefined): string {
    if (!variable) return '';

    return this.pretty.transform(variable);
  }

  getRows(): number {
    if (!this.variables) return 0;

    let row = 2;

    for (const _ in this.variables) {
      row += 1;
    }

    return row;
  }
}
