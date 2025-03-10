import { Component } from '@angular/core';
import { NavigationItem } from '../services/navigation/navigation-item';
import { NavigationService } from '../services/navigation/service/navigation.service';

@Component({
  selector: '',
  template: '',
  standalone: true
})
export class PageComponent {
  searchTerm: string = '';
  query?: any;
  response?: any;
  count: number = 0;

  constructor(
    private readonly _navigationService: NavigationService
  ) { }

  navigateForward(item: NavigationItem): void {
    this._navigationService.goForward(item);
  }
}
