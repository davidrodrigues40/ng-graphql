import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationItem } from 'src/app/services/navigation/navigation-item';

@Component({
    selector: 'app-graph-ql-menu',
    imports: [
        MatButtonModule
    ],
    providers: [
        Router
    ],
    templateUrl: './graph-ql-menu.component.html',
    styleUrl: './graph-ql-menu.component.scss'
})
export class GraphQlMenuComponent {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected menuItems: NavigationItem[] = [
    {
      name: 'Person API Favorites',
      url: 'person-api'
    }
  ];

  protected goTo(item: NavigationItem): void {
    this.router.navigate([item.url]);
  };

  protected disabled(item: NavigationItem): boolean {
    return this.activatedRoute.snapshot.url[0].path === item.url;
  }
}
