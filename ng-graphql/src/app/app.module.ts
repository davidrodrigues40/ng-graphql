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

@NgModule({
  declarations: [
    AppComponent,
    ProperCasePipe,
  ],
  imports: [
    BreadCrumbsComponent,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    RouterLink,
    RouterLinkActive,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
