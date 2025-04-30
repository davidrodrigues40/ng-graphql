import { Component, inject, OnInit } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { BreadCrumbService } from './services/navigation/bread-crumbs/bread-crumb.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    MenuComponent,
    BreadCrumbService]
})
export class AppComponent implements OnInit {
  constructor(private readonly _router: Router) { }
  title = 'ng-graphql';

  private readonly _breadcrumbService: BreadCrumbService = inject(BreadCrumbService);

  ngOnInit(): void {
    this._router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
      )
      .subscribe((route: Event) => {
        if (route instanceof NavigationEnd) {
          const index = this._breadcrumbService.getIndex(route.url.replace('/', '') ?? '');
          this._breadcrumbService.setBreadcrumbs(index);
        }

      });
  }
}
