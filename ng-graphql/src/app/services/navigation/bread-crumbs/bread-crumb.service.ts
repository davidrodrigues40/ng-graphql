import { Injectable } from '@angular/core';
import { BreadCrumb } from '../bread-crumb';
import { BreadCrumbState } from 'src/app/state/breadcrumbs/breadcrumbs-state';

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbService {
  private _homeLink: BreadCrumb = { name: 'Home', routerLink: '' }
  private _breadcrumbs: BreadCrumb[] = [];

  constructor() {
    this._breadcrumbs.push(this._homeLink);
  }

  setBreadCrumbs(breadcrumbs: BreadCrumb[]): void {
    BreadCrumbState.breadcrumbs$.next([...this._breadcrumbs].concat(breadcrumbs));
  }
}
