import { Component } from '@angular/core';
import { BreadCrumbService } from 'src/app/services/navigation/bread-crumbs/bread-crumb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private readonly _breadcrumbService: BreadCrumbService) {
    _breadcrumbService.setBreadCrumbs([]);
  }
}
