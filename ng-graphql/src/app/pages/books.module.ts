import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { GraphQlService } from '../services/graph-ql/graphql.service';
import { BookViewComponent } from '../views/book-view/book-view.component';
import { PageComponent } from './page.component';
import { BooksComponent } from './books/books.component';
import { MatDividerModule } from '@angular/material/divider';
import { AddBookComponent } from './add-book/add-book.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { BookSearchTypeComponent } from "./books/components/book-search-type/book-search-type.component";
import { OperatorsComponent } from "../components/operators/operators.component";
import { SearchComponent } from "../components/search/search.component";
import { SearchStatusComponent } from '../components/search-status/search-status.component';


@NgModule({
    declarations: [
        AddBookComponent,
        BooksComponent
    ],
    imports: [
        RouterModule,
        BookViewComponent,
        MatCardModule,
        MatFormFieldModule,
        CommonModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        PageComponent,
        RouterLink,
        RouterLinkActive,
        MatDividerModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatIconModule,
        BookSearchTypeComponent,
        OperatorsComponent,
        SearchComponent,
        SearchStatusComponent],
    providers: [
        OperatorsComponent,
        Router,
        { provide: GraphQlService, useClass: GraphQlService },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class BooksModule { }
