import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page.component';
import { GraphQlQuery } from 'src/app/models/graph-ql/graphql-query';
import { AllQuery, Query } from 'src/app/models/graph-ql/query';
import { GraphQlService } from 'src/app/services/graph-ql/graphql.service';
import { Router } from '@angular/router';
import { BookViewComponent } from 'src/app/views/book-view/book-view.component';
import { BreadCrumbService } from 'src/app/services/navigation/bread-crumbs/bread-crumb.service';
import { Subject } from 'rxjs';
import { Book } from 'src/app/graphQl/queryModels/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [
    BookViewComponent,
    GraphQlService
  ]
})
export class BooksComponent extends PageComponent implements OnInit {
  placeholder: string = 'ex. Dean Koontz';
  searchQuery: Query = new Query();
  allQuery: AllQuery = new AllQuery();
  books$: Subject<Book[]> = new Subject<Book[]>();

  constructor(private readonly _router: Router,
    private readonly _g: GraphQlService,
    private readonly _b: BreadCrumbService) { super(_g, _b); }

  ngOnInit(): void {
    this.doQuery(this.queries['all'], 'books', this.books$);
    this.setBreadcrumbs([{
      name: 'Books',
      routerLink: 'books'
    }])
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.doQuery(this.queries['all'], 'books', this.books$);
  }

  buildSearchQuery(): GraphQlQuery {
    if (this.searchTerm)
      return this.queries['search'];
    return this.queries['all'];
  }

  addBook(): void {
    this._router.navigate(['add-book'])
  }

  generateSearchQuery(): GraphQlQuery {
    var query: Query = {
      ...this.searchQuery,
      qlMethod: 'getBooks',
      apiMethod: 'booksByAuthor',
      parameters: [
        { field: 'authorLastName', type: 'String', value: this.searchTerm as string }
      ],
      returnProperties: '{id,title,author{firstName,lastName}}',
      graphQlQuery: this.searchQuery.graphQlQuery
    };

    return query.graphQlQuery();
  }

  generateAllQuery(): GraphQlQuery {
    var query: AllQuery = {
      ...this.allQuery,
      objectName: 'books',
      returnProperties: '{id,title,author{firstName,lastName}}',
      graphQlQuery: this.allQuery.graphQlQuery
    }

    console.log('query', query.graphQlQuery());
    return query.graphQlQuery();
  }

  get queries(): { [key: string]: GraphQlQuery } {
    return {
      search: this.generateSearchQuery(),
      all: this.generateAllQuery(),
      insert: {
        query: `mutation 
        addBook(newBook: {
          id: "00000000-0000-0000-0000-000000000000",
          title: "New Book", 
          pageSize: 100, 
          author: { 
            id: "de1c2993-33f7-4bc2-a4ac-150ad682877a",
            firstName: "John",
            lastName: "Doe"
          }
        }) {
          id,
          title
          }
        }`
      }
    };
  };
}