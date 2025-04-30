import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ProperCasePipe } from './pipes/proper-case.pipe';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { BreadCrumbsComponent } from './components/bread-crumbs/bread-crumbs.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { BreadCrumbService } from './services/navigation/bread-crumbs/bread-crumb.service';

@NgModule({
    declarations: [
        AppComponent,
        ProperCasePipe,
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
        MenuComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        BreadCrumbService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
})
export class AppModule { }
