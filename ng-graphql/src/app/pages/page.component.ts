import { Component, OnInit } from '@angular/core';
import { GraphQlQuery } from '../graphQl/models/graphql-query';
import { BreadCrumbService } from '../services/navigation/bread-crumbs/bread-crumb.service';
import { NavigationItem } from '../services/navigation/navigation-item';
import { NavigationService } from '../services/navigation/service/navigation.service';

@Component({
  selector: '',
  template: '',
  standalone: true
})
export class PageComponent {
  searchTerm: string = '';
  query?: GraphQlQuery;
  response?: any;
  count: number = 0;

  constructor(
    private readonly _navigationService: NavigationService
  ) { }

  navigateForward(item: NavigationItem): void {
    this._navigationService.goForward(item);
  }
}
