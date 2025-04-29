import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BreadCrumbService } from 'src/app/services/navigation/bread-crumbs/bread-crumb.service';
import { MenuComponent } from '../menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    MenuComponent,
  ],
  providers: [
    MatButtonModule,
    BrowserAnimationsModule
  ]
})
export class HomeComponent implements OnInit {

  constructor(private readonly _breadcrumbService: BreadCrumbService) { }

  ngOnInit(): void {
    this._breadcrumbService.getBreadcrumbs()
      .subscribe(breadcrumbs => {
        if (breadcrumbs.length == 0)
          this._breadcrumbService.setBreadcrumbs([]);
      });
  }
}
