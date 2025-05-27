import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-favorites-tab',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './favorites-tab.component.html',
  styleUrl: './favorites-tab.component.scss'
})
export class FavoritesTabComponent {
  @Output() readonly tabChanged: EventEmitter<MatTabChangeEvent> = new EventEmitter<MatTabChangeEvent>();

  currentIndex = input<number>(0);
}
