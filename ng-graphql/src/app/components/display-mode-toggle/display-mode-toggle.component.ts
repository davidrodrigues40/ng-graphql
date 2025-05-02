import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppState, LocalStorageSignal } from 'src/app/state/app.state';

@Component({
  selector: 'app-display-mode-toggle',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatIconModule
  ],
  templateUrl: './display-mode-toggle.component.html',
  styleUrl: './display-mode-toggle.component.scss'
})
export class DisplayModeToggleComponent implements OnInit {
  private readonly _mode: LocalStorageSignal<'light' | 'dark'> = AppState.displayMode;
  protected darkModeEnabled: boolean = this._mode.get() === 'dark';

  ngOnInit(): void {
    this.setTheme(this._mode.get());
  }

  protected onThemeChange(_: MatSlideToggleChange) {
    AppState.displayMode.set(this._mode.get() === 'dark' ? 'light' : 'dark');

    this.setTheme(this._mode.get());
  }

  private setTheme(theme: 'dark' | 'light'): void {
    document.body.classList.remove('light');
    document.body.classList.remove('dark');

    document.body.classList.add(this._mode.get());
  }
}
