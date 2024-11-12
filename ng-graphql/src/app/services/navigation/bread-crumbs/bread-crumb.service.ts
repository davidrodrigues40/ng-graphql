import { Injectable } from '@angular/core';
import { NavigationItem } from '../navigation-item';
import { BreadcrumbState } from 'src/app/state/breadcrumbs/breadcrumbs-state';
import { Store } from '@ngrx/store';
import * as selectors from 'src/app/state/breadcrumbs/breadcrumbs-selectors';
import * as actions from 'src/app/state/breadcrumbs/breadcrumbs-actions';
import { Observable } from 'rxjs';

const initialBreadcrumbs: Array<NavigationItem> = [{ name: 'Home', url: '' }];

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbService {
  private readonly _homeLink: NavigationItem = { name: 'Home', url: '' }

  constructor(private readonly _state: Store<BreadcrumbState>) { }

  getBreadcrumbs(): Observable<NavigationItem[]> {
    return this._state.select(selectors.breadcrumbs);
  }

  setBreadcrumbs(breadcrumbs: NavigationItem[]): void {
    this._state.dispatch(actions.BreadcrumbActions.set({ breadcrumbs: [...initialBreadcrumbs].concat(breadcrumbs) }));
  }

  addBreadcrumb(breadcrumb: NavigationItem): void {
    this._state.dispatch(actions.BreadcrumbActions.add({ breadcrumb }));
  }

  gotoBreadcrumb(breadcrumb: NavigationItem): void {
    this._state.dispatch(actions.BreadcrumbActions.goTo({ breadcrumb }));
  }
}
