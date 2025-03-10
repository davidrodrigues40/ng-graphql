import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './pages/books/books.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { HomeComponent } from './components/home/home.component';
import { PdfComponent } from './pages/pdf/pdf.component';
import { GraphQlViewComponent } from './pages/graph-ql-view/graph-ql-view.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'books',
    component: BooksComponent,
    loadChildren: () => import('./pages/books.module').then(m => m.BooksModule)
  },
  {
    path: 'add-book',
    component: AddBookComponent,
    loadChildren: () => import('./pages/books.module').then(m => m.BooksModule)
  },
  {
    path: 'pdf',
    component: PdfComponent
  },
  {
    path: 'graphql',
    component: GraphQlViewComponent
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
