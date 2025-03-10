import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavigationItem } from 'src/app/services/navigation/navigation-item';
import { NavigationService } from 'src/app/services/navigation/service/navigation.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  constructor(private readonly _service: NavigationService) { }

  menuItems: NavigationItem[] = [
    {
      name: 'Home',
      url: 'home'
    },
    {
      name: 'Books',
      url: 'books'
    },
    {
      name: 'PDF Viewer',
      url: 'pdf'
    },
    {
      name: 'GraphQL Builder',
      url: 'graphql'
    }
  ];

  goto(menuItem: NavigationItem): void {
    this._service.goForward(menuItem);
  }
}
