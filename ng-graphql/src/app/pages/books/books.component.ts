import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page.component';
import { GraphQlQuery, QueryOperator, WhereClause } from 'src/app/graphQl/models/graphql-query';
import { AllQuery, IQuery } from 'src/app/graphQl/models/query';
import { GraphQlService } from 'src/app/services/graph-ql/graphql.service';
import { Router } from '@angular/router';
import { BookViewComponent } from 'src/app/views/book-view/book-view.component';
import { BreadCrumbService } from 'src/app/services/navigation/bread-crumbs/bread-crumb.service';
import { Subject } from 'rxjs';
import { Book } from 'src/app/graphQl/queryTypes/book';
import { QueryBuilder } from 'src/app/services/query-builder/query-builder';

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
  authorPlaceholder: string = 'ex. Dean Koontz';
  titlePlaceholder: string = 'ex. Lord of the Rings';
  searchQuery: IQuery = {
    queryName: '',
    item: '',
    parameter: {
      term: '',
      field: '',
      type: '',
      value: undefined
    },
    searchTerm: '',
    returnValue: '',
    whereClause: new WhereClause,
    returnProperties: ''
  };
  allQuery: AllQuery = new AllQuery();
  books$: Subject<Book[]> = new Subject<Book[]>();

  constructor(private readonly _router: Router,
    private readonly _queryBuilder: QueryBuilder,
    private readonly _g: GraphQlService,
    private readonly _b: BreadCrumbService) { super(_g, _b); }

  ngOnInit(): void {
    this.doQuery(this.generateAllQuery(), 'books', this.books$);
    this.setBreadcrumbs([{
      name: 'Books',
      routerLink: 'books'
    }])
  }

  enterKeyPressed(event: KeyboardEvent, searchType: 'author' | 'book title', observable: Subject<any>): void {
    if (event.key.toLowerCase() === 'enter') {
      if (searchType === 'author') {
        this.bookSearchTerm = undefined;
        this.doQuery(this.buildSearchByAuthorQuery(), 'books', observable);
      }
      else {
        this.authorSearchTerm = undefined;
        this.doQuery(this.buildSearchByTitleQuery(), 'books', observable);
      }
    }
  }

  clearSearch(): void {
    this.authorSearchTerm = '';
    this.doQuery(this.generateAllQuery(), 'books', this.books$);
  }

  buildSearchByAuthorQuery(): GraphQlQuery {
    if (this.authorSearchTerm)
      return this.generateAuthorSearchQuery();

    return this.generateAllQuery();
  }

  buildSearchByTitleQuery(): GraphQlQuery {
    if (this.bookSearchTerm)
      return this.generateBookSearchQuery();

    return this.generateAllQuery();
  }

  addBook(): void {
    this._router.navigate(['add-book'])
  }

  generateAuthorSearchQuery(): GraphQlQuery {
    const authorClause: WhereClause = {
      field: 'name',
      subClause: null,
      term: 'term',
      operator: QueryOperator.contains
    };
    const where: WhereClause = {
      field: 'author',
      subClause: authorClause,
      operator: QueryOperator.none,
      term: this.authorSearchTerm as string
    };

    const query: IQuery = {
      ...this.searchQuery,
      queryName: 'getBooksByAuthor',
      item: 'books',
      parameter: {
        term: 'term',
        field: 'name',
        type: 'String!',
        value: this.authorSearchTerm
      },
      returnProperties: '{id,title,author{firstName,lastName}}',
      whereClause: where,
      returnValue: 'books'
    };
    this._queryBuilder.loadBuilder(query);

    return this._queryBuilder.buildQuery();
  }

  generateBookSearchQuery(): GraphQlQuery {
    const where: WhereClause = {
      field: 'title',
      subClause: null,
      operator: QueryOperator.contains,
      term: 'term' as string
    };

    const query: IQuery = {
      ...this.searchQuery,
      queryName: 'getBooksByTitle',
      item: 'books',
      parameter: {
        term: 'term',
        field: 'title',
        type: 'String!',
        value: this.bookSearchTerm
      },
      returnProperties: '{id,title,author{firstName,lastName}}',
      whereClause: where,
      returnValue: 'books'
    };
    console.log('query', query);
    this._queryBuilder.loadBuilder(query);

    return this._queryBuilder.buildQuery();
  }

  generateAllQuery(): GraphQlQuery {
    const query: AllQuery = {
      ...this.allQuery,
      queryName: 'getBooks',
      objectName: 'books',
      returnProperties: '{id,title,author{firstName,lastName}}',
      graphQlSearch: this.allQuery.graphQlSearch
    }

    return query.graphQlSearch();
  }
}