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
  placeholder: string = 'ex. Dean Koontz';
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

  clearSearch(): void {
    this.searchTerm = '';
    this.doQuery(this.generateAllQuery(), 'books', this.books$);
  }

  buildSearchQuery(): GraphQlQuery {
    if (this.searchTerm)
      return this.generateSearchQuery();

    return this.generateAllQuery();
  }

  addBook(): void {
    this._router.navigate(['add-book'])
  }

  generateSearchQuery(): GraphQlQuery {
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
      term: this.searchTerm as string
    };

    const query: IQuery = {
      ...this.searchQuery,
      queryName: 'getBooksByAuthor',
      item: 'books',
      parameter: {
        term: 'term',
        field: 'name',
        type: 'String!',
        value: this.searchTerm
      },
      returnProperties: '{id,title,author{firstName,lastName}}',
      whereClause: where,
      returnValue: 'books'
    };
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