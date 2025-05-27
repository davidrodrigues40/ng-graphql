import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
   {
      path: 'home',
      loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
   },
   {
      path: 'graphql',
      loadComponent: () => import('./pages/graph-ql-view/graph-ql-view.component').then(m => m.GraphQlViewComponent)
   },
   {
      path: 'person-api',
      loadComponent: () => import('./pages/person-api-favorites/person-api-favorites.component').then(m => m.PersonApiFavoritesComponent)
   },
   {
      path: '**',
      redirectTo: 'home'
   }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
