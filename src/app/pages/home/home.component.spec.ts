import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MockComponent } from 'ng-mocks';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { PageTitleComponent } from 'src/app/components/page-title/page-title.component';

describe('HomeComponent', () => {
   let component: HomeComponent;
   let fixture: ComponentFixture<HomeComponent>;

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [
            HomeComponent,
            MockComponent(MenuComponent),
            MockComponent(PageTitleComponent),]
      });
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
