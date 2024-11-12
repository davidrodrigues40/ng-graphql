import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BreadCrumbService } from '../bread-crumbs/bread-crumb.service';
import { NavigationItem } from '../navigation-item';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private readonly routerLink: Router,
    private readonly _breadcrumbService: BreadCrumbService
  ) { }

  goForward(item: NavigationItem): void {
    this._breadcrumbService.addBreadcrumb({ name: item.name, url: item.url });
    this.routerLink.navigateByUrl(item.url);
  }

  goBackwards(item: NavigationItem): void {
    this._breadcrumbService.gotoBreadcrumb({ name: item.name, url: item.url });
    this.routerLink.navigateByUrl(item.url);
  }
}
