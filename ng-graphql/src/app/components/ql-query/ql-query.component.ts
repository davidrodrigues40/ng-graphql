import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CopyComponent } from '../copy/copy.component';

@Component({
  selector: 'app-ql-query',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    CopyComponent,
  ],
  templateUrl: './ql-query.component.html',
  styleUrl: './ql-query.component.scss'
})
export class QlQueryComponent implements OnChanges {
  @Input() query: string = '';

  protected rows: number = this.query.split('\n').length;

  private readonly _snackbar = inject(MatSnackBar);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['query']) {
      this.rows = this.query.split('\n').length;
    }
  }

  copyToClipboard(): void {
    if (!this.query) return;
    navigator.clipboard.writeText(this.query).then(() => {
      this._snackbar.open('Copied query to clipboard', '', {
        duration: 2000
      });
    });
  }
}
