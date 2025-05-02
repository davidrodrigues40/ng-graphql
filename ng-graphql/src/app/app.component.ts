import { Component, inject, OnInit } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { BreadCrumbService } from './services/navigation/bread-crumbs/bread-crumb.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AppState } from './state/app.state';
import { ThemeSetterService } from './services/theme-setter/theme-setter.service';
import { DisplayModeToggleComponent } from './components/display-mode-toggle/display-mode-toggle.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    MenuComponent,
    BreadCrumbService,
    DisplayModeToggleComponent
  ],
  standalone: false
})
export class AppComponent implements OnInit {
  constructor(private readonly _router: Router) { }

  private readonly _mode = AppState.displayMode;
  private readonly _themeService: ThemeSetterService = inject(ThemeSetterService);

  protected readonly darkModeEnabled: boolean = this._themeService.getTheme() === 'dark';
  protected title = 'ng-graphql';

  private readonly _breadcrumbService: BreadCrumbService = inject(BreadCrumbService);

  ngOnInit(): void {
    this._router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
      )
      .subscribe((route: NavigationEnd) => {
        const index = this._breadcrumbService.getIndex(route.url.replace('/', '') ?? '');
        this._breadcrumbService.setBreadcrumbs(index);
      });
  }
}
