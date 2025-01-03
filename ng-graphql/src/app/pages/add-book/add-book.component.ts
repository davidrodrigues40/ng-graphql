import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EmptyGUID } from 'src/app/graphQl/custom-types/types';
import { Author } from 'src/app/graphQl/queryTypes/author';
import { Book } from 'src/app/graphQl/queryTypes/book';
import { Mutation } from 'src/app/graphQl/models/mutation';
import { IQuery } from 'src/app/graphQl/models/query';
import { GraphQlService } from 'src/app/services/graph-ql/graphql.service';
import { BreadCrumbService } from 'src/app/services/navigation/bread-crumbs/bread-crumb.service';
import { PageComponent } from '../page.component';
import { NavigationService } from 'src/app/services/navigation/service/navigation.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  providers: [GraphQlService]
})
export class AddBookComponent extends PageComponent implements OnInit {
  private readonly _insertQuery: Mutation = new Mutation();
  insertedBook$: Subject<Book> = new Subject<Book>();
  authors$: Subject<Author[]> = new Subject<Author[]>();
  book: Book = {
    id: EmptyGUID.value,
    title: '',
    pageCount: 0,
    author: {
      id: EmptyGUID.value,
      firstName: '',
      lastName: ''
    }
  }
  private readonly saveResponse$: Subject<Book> = new Subject<Book>();

  constructor(private readonly _breadcrumbService: BreadCrumbService,
    private readonly _: NavigationService
  ) { super(_); }

  ngOnInit(): void {
    this.getAuthors();

    this._breadcrumbService.getBreadcrumbs()
      .subscribe(breadcrumbs => {
        if (breadcrumbs.length == 0)
          this._breadcrumbService.setBreadcrumbs([{ name: 'Books', url: 'books' }, { name: 'Add Book', url: 'add-book' }]);
      });

    this.saveResponse$
      .subscribe(response => console.log("save", response));
  }

  addBook(): void {
    const mutation: Mutation = {
      ...this._insertQuery,
      apiMethod: 'addBook',
      returnProperties: '{title, pageCount, author {firstName, lastName}}',
      parameter: {
        term: '',
        field: 'newBook',
        type: 'BookInput',
        value: this.book
      },
      graphQlSearch: this._insertQuery.graphQlSearch,
    };

    //this.doQuery(mutation.graphQlSearch(), 'book', this.insertedBook$)
  }

  changePageCount(event: Event): void {
    const input: HTMLInputElement = <HTMLInputElement>event.target;
    const value: number = parseInt(input.value);

    if (!input || isNaN(value))
      return;

    this.book.pageCount = value;
  }

  properCase(value: string): string {
    const inputs = value.split(' ');
    const outputs: string[] = [];

    inputs.forEach(input => {
      outputs.push(input.substring(0, 1).toUpperCase() + input.substring(1, input.length - 1).toLowerCase());
    });

    return inputs.join(' ');
  }

  getAuthors(): void {
    const query: IQuery = {
      ...this.query,
      item: 'authors',
      returnProperties: '{firstName,lastName, id}',
      queryName: 'GetAuthors',
      returnValue: 'authors'
    };
  }
}
