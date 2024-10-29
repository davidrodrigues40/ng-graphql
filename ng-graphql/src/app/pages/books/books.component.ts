import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page.component';
import { GraphQlQuery, QueryOperator, WhereClause } from 'src/app/graphQl/models/graphql-query';
import { AllQuery, IQuery } from 'src/app/graphQl/models/query';
import { GraphQlService } from 'src/app/services/graph-ql/graphql.service';
import { BookViewComponent } from 'src/app/views/book-view/book-view.component';
import { BreadCrumbService } from 'src/app/services/navigation/bread-crumbs/bread-crumb.service';
import { Subject } from 'rxjs';
import { Book } from 'src/app/graphQl/queryTypes/book';
import { QueryBuilder } from 'src/app/services/query-builder/query-builder';
import { Router } from '@angular/router';

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
  private readonly authorPlaceholder: string = 'ex. J. R. R. Tolkien';
  private readonly bookTitlePlaceholder: string = 'ex. Lord of the Rings';
  private readonly allQuery: AllQuery = new AllQuery();
  private readonly searchQuery: IQuery = {
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

  inputPlaceholder: string = this.authorPlaceholder;
  searchType: 'author' | 'book title' = 'author';
  condition: QueryOperator = QueryOperator.equals;
  books$: Subject<Book[]> = new Subject<Book[]>();

  get operators(): typeof QueryOperator {
    return QueryOperator;
  }

  constructor(private readonly _router: Router,
    private readonly _queryBuilder: QueryBuilder,
    private readonly _: GraphQlService,
    private readonly __: BreadCrumbService) { super(_, __); }

  ngOnInit(): void {
    this.doQuery(this.generateAllQuery(), 'books', this.books$);
    this.setBreadcrumbs([{
      name: 'Books',
      routerLink: 'books'
    }])
  }

  enterKeyPressed(event: KeyboardEvent): void {
    if (event.key.toLowerCase() === 'enter') {
      this.search();
    }
  }

  clearSearch(): void {
    this.searchTerm = undefined;
    this.doQuery(this.generateAllQuery(), 'books', this.books$);
  }

  buildSearchByAuthorQuery(): GraphQlQuery {
    if (this.searchTerm)
      return this.generateAuthorSearchQuery();

    return this.generateAllQuery();
  }

  buildSearchByTitleQuery(): GraphQlQuery {
    if (this.searchTerm)
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
      operator: this.condition
    };
    const where: WhereClause = {
      field: 'author',
      subClause: authorClause,
      operator: QueryOperator.none,
      term: this.searchTerm as string
    };

    return this.generateSearchQuery(
      'getBooksByAuthor',
      'name',
      where
    );
  }

  generateBookSearchQuery(): GraphQlQuery {
    const where: WhereClause = {
      field: 'title',
      subClause: null,
      operator: this.condition,
      term: 'term' as string
    };

    return this.generateSearchQuery(
      'getBooksByTitle',
      'title',
      where
    );
  }

  generateSearchQuery(queryName: string, field: string, where: WhereClause): GraphQlQuery {
    const query: IQuery = {
      ...this.searchQuery,
      queryName: queryName,
      item: 'books',
      parameter: {
        term: 'term',
        field: field,
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

  changeSearchType(value: 'author' | 'book title'): void {
    this.searchType = value;
    if (value === 'author')
      this.inputPlaceholder = this.authorPlaceholder;
    else
      this.inputPlaceholder = this.bookTitlePlaceholder;

    this.search();
  }

  changeCondition(value: QueryOperator): void {
    this.condition = value;
    this.search();
  }

  search(): void {
    switch (this.searchType) {
      case 'author': {
        this.doQuery(this.buildSearchByAuthorQuery(), 'books', this.books$);
        break;
      }
      case 'book title': {
        this.doQuery(this.buildSearchByTitleQuery(), 'books', this.books$);
        break;
      }
      default: {
        throw new Error("Unsupported search type");
      }
    }
  }
}