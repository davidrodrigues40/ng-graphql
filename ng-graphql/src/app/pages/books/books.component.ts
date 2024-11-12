import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page.component';
import { GraphQlQuery, WhereClause } from 'src/app/graphQl/models/graphql-query';
import { IQuery } from 'src/app/graphQl/models/query';
import { GraphQlService } from 'src/app/services/graph-ql/graphql.service';
import { BookViewComponent } from 'src/app/views/book-view/book-view.component';
import { BreadCrumbService } from 'src/app/services/navigation/bread-crumbs/bread-crumb.service';
import { Observable } from 'rxjs';
import { Book } from 'src/app/graphQl/queryTypes/book';
import { QueryBuilder } from 'src/app/services/query-builder/query-builder';
import { Router } from '@angular/router';
import { QueryOperator } from 'src/app/enums/query-operator.enum';
import { BookSearchType } from 'src/app/enums/book-search-type.enum';
import { BookSearchTypeComponent } from './components/book-search-type/book-search-type.component';
import { BooksState } from 'src/app/state/books/books.state';
import { Store } from '@ngrx/store';
import * as actions from 'src/app/state/books/books-actions';
import * as selectors from 'src/app/state/books/books-selectors';
import { NavigationService } from 'src/app/services/navigation/service/navigation.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [
    BookSearchTypeComponent,
    BookViewComponent,
    GraphQlService
  ]
})
export class BooksComponent extends PageComponent implements OnInit {
  private readonly authorPlaceholder: string = 'ex. J. R. R. Tolkien';
  private readonly bookTitlePlaceholder: string = 'ex. Lord of the Rings';
  private readonly searchQuery: IQuery = {
    queryName: '',
    item: '',
    returnValue: '',
    returnProperties: ''
  };
  searchType: BookSearchType = BookSearchType.author;
  inputPlaceholder: string = this.authorPlaceholder;
  operator: QueryOperator = QueryOperator.equals;
  books$: Observable<ReadonlyArray<Book>> = this._booksState.select(selectors.books);

  get operators(): typeof QueryOperator {
    return QueryOperator;
  }

  get searchTypes(): typeof BookSearchType {
    return BookSearchType;
  }

  constructor(private readonly _router: Router,
    private readonly _queryBuilder: QueryBuilder,
    private readonly _booksState: Store<BooksState>,
    private readonly _breadcrumbService: BreadCrumbService,
    private readonly _: NavigationService) { super(_); }

  ngOnInit(): void {
    this._breadcrumbService.getBreadcrumbs()
      .subscribe(breadcrumbs => {
        if (breadcrumbs.length == 0)
          this._breadcrumbService.setBreadcrumbs([{ name: 'Books', url: 'books' }]);
      });
    this._booksState.dispatch(actions.BooksActions.searchBooks({ query: this.generateAllQuery() }));
  }

  enterKeyPressed(event: KeyboardEvent): void {
    if (event.key.toLowerCase() === 'enter') {
      this.search();
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this._booksState.dispatch(actions.BooksActions.searchBooks({ query: this.generateAllQuery() }));
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
      operator: this.operator
    };
    const where: WhereClause = {
      field: 'author',
      subClause: authorClause,
      operator: QueryOperator.none,
      term: this.searchTerm
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
      operator: this.operator,
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
    const query: IQuery = {
      ...this.searchQuery,
      queryName: 'getBooks',
      item: 'books',
      returnProperties: '{id,title,author{firstName,lastName}}',
      returnValue: 'books'
    };

    this._queryBuilder.loadBuilder(query);

    return this._queryBuilder.buildQuery();
  }

  changeSearchType(value: BookSearchType): void {
    this.searchType = value;
    if (value === BookSearchType.author)
      this.inputPlaceholder = this.authorPlaceholder;
    else
      this.inputPlaceholder = this.bookTitlePlaceholder;

    this.search();
  }

  changeOperator(value: QueryOperator): void {
    this.operator = value;
    this.search();
  }

  search(): void {
    switch (this.searchType) {
      case BookSearchType.author: {
        this.dispatch(this.buildSearchByAuthorQuery());
        break;
      }
      case BookSearchType.bookTitle: {
        this.dispatch(this.buildSearchByTitleQuery());
        break;
      }
      default: {
        throw new Error("Unsupported search type");
      }
    }
  }

  addBookClicked(): void {
    this.navigateForward({ name: 'Add Book', url: 'add-book' });
  }

  private dispatch(query: GraphQlQuery): void {
    this._booksState.dispatch(actions.BooksActions.searchBooks({ query: query }));
  }
}