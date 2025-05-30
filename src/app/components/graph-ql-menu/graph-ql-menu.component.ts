import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavigationItem } from 'src/app/services/navigation/navigation-item';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
   selector: 'app-graph-ql-menu',
   standalone: true,
   imports: [
      MatButtonModule,
      RouterModule
   ],
   providers: [
      Router,
   ],
   templateUrl: './graph-ql-menu.component.html',
   styleUrl: './graph-ql-menu.component.scss'
})
export class GraphQlMenuComponent {

   private readonly navigationService = inject(NavigationService);
   private readonly activatedRoute = inject(ActivatedRoute);

   protected menuItems: NavigationItem[] = [
      {
         name: 'Person API Favorites',
         url: 'person-api'
      }
   ];

   protected goTo(item: NavigationItem): void {
      this.navigationService.navigate(item);
   };

   protected disabled(item: NavigationItem): boolean {
      return this.activatedRoute.snapshot.url[0].path === item.url;
   }
}
