import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProperCasePipe } from './pipes/proper-case.pipe';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { BreadCrumbsComponent } from './components/bread-crumbs/bread-crumbs.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './state/app.reducers';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from "./components/menu/menu.component";
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ProperCasePipe,
    HomeComponent
  ],
  imports: [
    BreadCrumbsComponent,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(),
    MenuComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
