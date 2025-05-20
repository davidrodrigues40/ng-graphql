import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BreadCrumbService } from 'src/app/services/navigation/bread-crumbs/bread-crumb.service';
import { NavigationItem } from 'src/app/services/navigation/navigation-item';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
   selector: 'app-menu',
   imports: [
      CommonModule,
      MatButtonModule
   ],
   providers: [
      BreadCrumbService,
      Router
   ],
   templateUrl: './menu.component.html',
   styleUrl: './menu.component.scss'
})
export class MenuComponent {
   private readonly navigationService: NavigationService = inject(NavigationService);

   menuItems: NavigationItem[] = [
      {
         name: 'GraphQL Builder',
         url: 'graphql'
      }
   ];

   goto(menuItem: NavigationItem): void {
      this.navigationService.navigate(menuItem);
   }
}
