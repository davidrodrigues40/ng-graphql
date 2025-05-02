import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-copy',
    imports: [
        MatButtonModule,
        MatTooltipModule,
        MatIconModule
    ],
    providers: [
        MatSnackBarModule
    ],
    templateUrl: './copy.component.html',
    styleUrl: './copy.component.scss'
})
export class CopyComponent {
  @Input() text: string = '';
  @Input() tooltip: string = 'Copy to clipboard';

  private readonly _snackbar = inject(MatSnackBar);

  copyToClipboard(): void {
    if (!this.text) return;
    navigator.clipboard.writeText(this.text).then(() => {
      this._snackbar.open('Copied to clipboard', '', {
        duration: 2000
      });
    });
  }
}
