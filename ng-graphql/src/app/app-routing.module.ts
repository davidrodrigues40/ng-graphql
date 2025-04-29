import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GraphQlViewComponent } from './pages/graph-ql-view/graph-ql-view.component';
import { PersonApiFavoritesComponent } from './pages/person-api-favorites/person-api-favorites.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'graphql',
    component: GraphQlViewComponent
  },
  {
    path: 'person-api',
    component: PersonApiFavoritesComponent
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
