import { Component } from '@angular/core';
import { EMPTY, Observable, Subject, map } from 'rxjs';
import { GraphQlQuery } from '../graphQl/models/graphql-query';
import { BreadCrumbService } from '../services/navigation/bread-crumbs/bread-crumb.service';
import { BreadCrumb } from '../services/navigation/bread-crumb';
import { GraphQlService } from '../services/graph-ql/graphql.service';

@Component({
  selector: '',
  template: '',
  standalone: true
})
export class PageComponent {
  authorSearchTerm?: string;
  bookSearchTerm?: string;
  query?: GraphQlQuery;
  response?: any;

  constructor(private _graphQlService: GraphQlService,
    private readonly _breadcrumbService: BreadCrumbService
  ) { }

  get doQuery$(): Observable<any> {
    if (this.query)
      return this._graphQlService.DoQuery(this.query);

    return EMPTY;
  }

  doQuery(query: GraphQlQuery, objectName: string, returnObservable: Subject<any>): void {
    this.query = query;
    this.doQuery$
      .pipe(
        map(response => response[objectName]))
      .subscribe(response => returnObservable.next(response));
  }

  setBreadcrumbs(breadcrumbs: BreadCrumb[]): void {
    this._breadcrumbService.setBreadCrumbs(breadcrumbs);
  }
}
