import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadCrumbService } from 'src/app/services/navigation/bread-crumbs/bread-crumb.service';
import { BreadCrumbState } from 'src/app/state/breadcrumbs/breadcrumbs-state';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule
  ],
  providers: [
    BreadCrumbService
  ]
})
export class BreadCrumbsComponent {
  breadcrumbs$ = BreadCrumbState.breadcrumbs$;
}
