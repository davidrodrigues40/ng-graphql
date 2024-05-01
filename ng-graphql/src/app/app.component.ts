import { Component } from '@angular/core';
import { BreadCrumbsComponent } from './components/bread-crumbs/bread-crumbs.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-graphql';

  constructor() { }
}
