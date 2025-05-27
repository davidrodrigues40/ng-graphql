import { Injectable } from '@angular/core';
import { AppState } from 'src/app/state/app.state';

@Injectable({
  providedIn: 'root'
})
export class ThemeSetterService {

  getTheme(): 'light' | 'dark' {
    return AppState.displayMode.get();
  }

  setTheme(theme: 'light' | 'dark'): void {
    AppState.displayMode.set(theme);
  }
}
