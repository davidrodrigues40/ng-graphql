import { inject, Injectable } from '@angular/core';
import { NavigationItem } from '../navigation-item';
import { BreadcrumbState } from 'src/app/state/breadcrumb.state';
import { NavigationService } from '../navigation.service';

@Injectable()
export class BreadCrumbService {
   static readonly homeLink: NavigationItem = { name: 'Home', url: '' };
   static readonly graphQlLink: NavigationItem = { name: 'GraphQL', url: 'graphql' };
   static readonly personApiLink: NavigationItem = { name: 'Person API', url: 'person-api' };

   private readonly _navigationService: NavigationService = inject(NavigationService);
   private static readonly _links: Array<NavigationItem> = [
      BreadCrumbService.homeLink,
      BreadCrumbService.graphQlLink,
      BreadCrumbService.personApiLink
   ];

   getIndex(url: string): number {
      return BreadCrumbService._links.findIndex(link => link.url === url);
   }

   setBreadcrumbs(index: number): void {
      if (index > -1)
         BreadcrumbState.breadcrumbs.set(BreadCrumbService._links.slice(0, index + 1));
      else
         BreadcrumbState.breadcrumbs.set([BreadCrumbService.homeLink]);
   }

   addBreadcrumb(breadcrumb: NavigationItem): void {
      const breadcrumbs = BreadcrumbState.breadcrumbs();
      breadcrumbs.push(breadcrumb);
      BreadcrumbState.breadcrumbs.set(breadcrumbs);
   }

   gotoBreadcrumb(breadcrumb: NavigationItem): void {
      const index = BreadCrumbService._links.findIndex(link => link.url === breadcrumb.url);

      if (index > -1) {
         BreadcrumbState.breadcrumbs.set(BreadCrumbService._links.slice(0, index + 1));
      } else {
         this.setBreadcrumbs(0);
      }

      this._navigationService.navigate(breadcrumb);
   }
}
