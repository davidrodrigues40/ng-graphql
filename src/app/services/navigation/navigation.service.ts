import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItem } from './navigation-item';

@Injectable({
   providedIn: 'root'
})
export class NavigationService {

   private readonly _router: Router = inject(Router);

   navigate(item: NavigationItem): void {
      this._router.navigate([item.url]);
   }
}
