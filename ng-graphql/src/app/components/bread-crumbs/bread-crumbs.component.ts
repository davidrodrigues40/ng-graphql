import { CommonModule } from '@angular/common';
import { Component, inject, WritableSignal } from '@angular/core';
import { BreadCrumbService } from 'src/app/services/navigation/bread-crumbs/bread-crumb.service';
import { MatIconModule } from '@angular/material/icon';
import { NavigationItem } from 'src/app/services/navigation/navigation-item';
import { BreadcrumbState } from 'src/app/state/breadcrumb.state';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
   selector: 'app-breadcrumbs',
   templateUrl: './bread-crumbs.component.html',
   styleUrls: ['./bread-crumbs.component.scss'],
   imports: [
      CommonModule,
      MatIconModule,
      MatButtonModule
   ],
   providers: [
      BreadCrumbService,
      Router
   ],
   standalone: true
})
export class BreadCrumbsComponent {
   private readonly _router: Router = inject(Router);
   breadcrumbs$: WritableSignal<NavigationItem[]> = BreadcrumbState.breadcrumbs;

   goto(item: NavigationItem): void {
      console.log('breadcrumbs', item);
      this._router.navigate([item.url]);
   }
}
