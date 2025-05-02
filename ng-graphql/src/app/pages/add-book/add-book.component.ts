import { Component, OnInit } from '@angular/core';
import { GraphQlService } from 'src/app/services/graph-ql/graphql.service';
import { BreadCrumbService } from 'src/app/services/navigation/bread-crumbs/bread-crumb.service';
import { PageComponent } from '../page.component';
import { NavigationService } from 'src/app/services/navigation/service/navigation.service';

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.scss'],
    providers: [GraphQlService],
    standalone: false
})
export class AddBookComponent extends PageComponent implements OnInit {

  constructor(private readonly _breadcrumbService: BreadCrumbService,
    private readonly _: NavigationService
  ) { super(_); }

  ngOnInit(): void {
    this._breadcrumbService.getBreadcrumbs()
      .subscribe(breadcrumbs => {
        if (breadcrumbs.length == 0)
          this._breadcrumbService.setBreadcrumbs([{ name: 'Books', url: 'books' }, { name: 'Add Book', url: 'add-book' }]);
      });
  }
}
