import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EmptyGUID } from 'src/app/custom-types/types';
import { Author } from 'src/app/graphQl/queryModels/author';
import { Book } from 'src/app/graphQl/queryModels/book';
import { Mutation } from 'src/app/models/graph-ql/mutation';
import { AllQuery } from 'src/app/models/graph-ql/query';
import { GraphQlService } from 'src/app/services/graph-ql/graphql.service';
import { BreadCrumbService } from 'src/app/services/navigation/bread-crumbs/bread-crumb.service';
import { PageComponent } from '../page.component';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  providers: [GraphQlService]
})
export class AddBookComponent extends PageComponent implements OnInit {
  private readonly _authorQuery: AllQuery = new AllQuery();
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

  constructor(private readonly _g: GraphQlService,
    private readonly _b: BreadCrumbService
  ) { super(_g, _b); }

  ngOnInit(): void {
    this.getAuthors();
    this.setBreadcrumbs([{
      name: 'Books',
      routerLink: 'books'
    },
    {
      name: 'Add Book',
      routerLink: 'add-book'
    }]);

    this.saveResponse$
      .subscribe(response => console.log("save", response));
  }

  addBook(): void {
    var mutation: Mutation = {
      ...this._insertQuery,
      apiMethod: 'addBook',
      returnProperties: '{title, pageCount, author {firstName, lastName}}',
      parameter: {
        field: 'newBook',
        type: 'BookInput',
        value: this.book
      },
      graphQlQuery: this._insertQuery.graphQlQuery,
    };

    this.doQuery(mutation.graphQlQuery(), 'book', this.insertedBook$)
  }

  changePageCount(event: Event): void {
    const input: HTMLInputElement = <HTMLInputElement>event.target;
    var value: number = parseInt(input.value);

    if (!input || isNaN(value))
      return;

    this.book.pageCount = value;
  }

  properCase(value: string): string {
    var inputs = value.split(' ');
    var outputs: string[] = [];

    inputs.forEach(input => {
      outputs.push(input.substring(0, 1).toUpperCase() + input.substring(1, input.length - 1).toLowerCase());
    });

    return inputs.join(' ');
  }

  getAuthors(): void {
    var query: AllQuery = {
      ...this._authorQuery,
      objectName: 'authors',
      returnProperties: '{firstName,lastName, id}',
      graphQlQuery: this._authorQuery.graphQlQuery
    }

    this.doQuery(query.graphQlQuery(), 'authors', this.authors$);
  }
}
