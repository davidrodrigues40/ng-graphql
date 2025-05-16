import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavigationItem } from 'src/app/services/navigation/navigation-item';

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

   private readonly router = inject(Router);
   private readonly activatedRoute = inject(ActivatedRoute);

   protected menuItems: NavigationItem[] = [
      {
         name: 'Person API Favorites',
         url: 'person-api'
      }
   ];

   protected goTo(item: NavigationItem): void {
      console.log('graphql', item);
      this.router.navigate([item.url]);
   };

   protected disabled(item: NavigationItem): boolean {
      return this.activatedRoute.snapshot.url[0].path === item.url;
   }
}
