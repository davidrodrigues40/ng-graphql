import { Component, OnInit } from '@angular/core';
import { PageComponent } from '../page.component';
import { GraphQlService } from 'src/app/services/graph-ql/graphql.service';
import { BookViewComponent } from 'src/app/views/book-view/book-view.component';
import { BreadCrumbService } from 'src/app/services/navigation/bread-crumbs/bread-crumb.service';
import { Router } from '@angular/router';
import { QueryOperator } from 'src/app/enums/query-operator.enum';
import { BookSearchType } from 'src/app/enums/book-search-type.enum';
import { BookSearchTypeComponent } from './components/book-search-type/book-search-type.component';
import { NavigationService } from 'src/app/services/navigation/service/navigation.service';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss'],
    providers: [
        BookSearchTypeComponent,
        BookViewComponent,
        GraphQlService
    ],
    standalone: false
})
export class BooksComponent extends PageComponent implements OnInit {
  private readonly authorPlaceholder: string = 'ex. J. R. R. Tolkien';
  private readonly bookTitlePlaceholder: string = 'ex. Lord of the Rings';
  searchType: BookSearchType = BookSearchType.author;
  inputPlaceholder: string = this.authorPlaceholder;
  operator: QueryOperator = QueryOperator.equals;

  get operators(): typeof QueryOperator {
    return QueryOperator;
  }

  get searchTypes(): typeof BookSearchType {
    return BookSearchType;
  }

  constructor(private readonly _router: Router,
    private readonly _breadcrumbService: BreadCrumbService,
    private readonly _: NavigationService) { super(_); }

  ngOnInit(): void {
    this._breadcrumbService.getBreadcrumbs()
      .subscribe(breadcrumbs => {
        if (breadcrumbs.length == 0)
          this._breadcrumbService.setBreadcrumbs([{ name: 'Books', url: 'books' }]);
      });
  }
}