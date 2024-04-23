import { Component, OnInit } from '@angular/core';
import { GraphQlQuery } from 'src/app/models/graphQlquery';
import { Query } from 'src/app/models/query';
import { BooksService } from 'src/app/services/books/books.service';
import { GraphqlHelperService } from 'src/app/utilities/graphql-helper/graphql-helper.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html'
})
export class BooksComponent implements OnInit {
  query?: GraphQlQuery;
  response?: any;

  constructor(private readonly _helper: GraphqlHelperService,
    private readonly _service: BooksService
  ) { }

  ngOnInit(): void {
    let query: Query = {
      objectName: 'book',
      returnFields: ['id', 'title', 'author.firstName', 'author.lastName'],
      method: 'book',
      inputParameters: [
        this._helper.SetInputParameterValue(this._helper.GenerateParameter('id', 'UUID'), 'fc701015-d6ff-43de-a93b-e840d6428b78')
      ]
    };
    this.query = this._helper.GenerateQuery(query);
    this.getBook();
  }

  private getBook(): void {
    if (this.query)
      this._service.GetBook(this.query)
        .subscribe(response => this.response = response);
  }
}
