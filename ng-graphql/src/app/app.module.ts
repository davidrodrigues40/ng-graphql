import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ProperCasePipe } from './pipes/proper-case.pipe';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { BreadCrumbsComponent } from './components/bread-crumbs/bread-crumbs.component';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './state/app.reducers';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/auth-interceptor';

@NgModule({
    declarations: [
        AppComponent,
        ProperCasePipe,
        HomeComponent
    ],
    imports: [
        BreadCrumbsComponent,
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        MatSelectModule,
        MatButtonModule,
        RouterLink,
        RouterLinkActive,
        RouterModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot(),
        MenuComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
})
export class AppModule { }
