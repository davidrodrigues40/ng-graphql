import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockComponent } from 'ng-mocks';
import { LogoComponent } from './components/logo/logo.component';
import { DisplayModeToggleComponent } from './components/display-mode-toggle/display-mode-toggle.component';
import { BreadCrumbsComponent } from './components/bread-crumbs/bread-crumbs.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadCrumbService } from './services/navigation/bread-crumbs/bread-crumb.service';
import { ThemeSetterService } from './services/theme-setter/theme-setter.service';

describe('AppComponent', () => {
   let component: AppComponent;
   let breadcrumbService = jasmine.createSpyObj('BreadCrumbService', ['setBreadcrumbs', 'getIndex']);
   let themeService = jasmine.createSpyObj('ThemeSetterService', ['getTheme']);

   beforeEach(() => {
      TestBed.configureTestingModule({
         declarations: [AppComponent],
         providers: [
            CommonModule,
            AppComponent,
            { provide: BreadCrumbService, useValue: breadcrumbService },
            { provide: ThemeSetterService, useValue: themeService },
         ],
         imports: [
            RouterModule.forRoot([]),
            MockComponent(LogoComponent),
            MockComponent(DisplayModeToggleComponent),
            MockComponent(BreadCrumbsComponent),
         ]
      })
         .compileComponents();

      component = TestBed.inject(AppComponent);
   });


   it('should create the app', () => {
      expect(component).toBeTruthy();
   });

   it(`should have as title 'ng-graphql'`, () => {
      expect(component['title']).toEqual('ng-graphql');
   });
});
