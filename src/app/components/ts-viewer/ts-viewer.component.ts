import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CopyComponent } from '../copy/copy.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
   selector: 'app-ts-viewer',
   imports: [CommonModule,
      MatButtonModule,
      MatIconModule,
      MatSnackBarModule,
      MatTooltipModule,
      CopyComponent,],
   providers: [JsonPipe],
   templateUrl: './ts-viewer.component.html',
   styleUrl: './ts-viewer.component.scss'
})
export class TsViewerComponent implements OnChanges {
   ngOnChanges(changes: SimpleChanges): void {
      console.log('Changes detected in TS viewer', changes);
      this.rows = changes['ts'] ? this.ts.split('\n').length : 0;
   }
   @Input()
   ts: string = '';
   protected rows: number = this.ts.split('\n').length || 0;
}
