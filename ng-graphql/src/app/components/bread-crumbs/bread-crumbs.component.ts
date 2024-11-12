import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadCrumbService } from 'src/app/services/navigation/bread-crumbs/bread-crumb.service';
import { MatIconModule } from '@angular/material/icon';
import { NavigationItem } from 'src/app/services/navigation/navigation-item';
import { NavigationService } from 'src/app/services/navigation/service/navigation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule
  ],
  providers: [
    BreadCrumbService
  ]
})
export class BreadCrumbsComponent {
  breadcrumbs$: Observable<ReadonlyArray<NavigationItem>> = this._breadcrumbService.getBreadcrumbs();

  constructor(private readonly _navigationService: NavigationService,
    private readonly _breadcrumbService: BreadCrumbService
  ) { }

  goto(item: NavigationItem): void {
    this._navigationService.goBackwards(item);
  }
}
