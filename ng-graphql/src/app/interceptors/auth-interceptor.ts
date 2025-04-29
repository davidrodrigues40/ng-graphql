import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private readonly _token: string = '';
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // set token once logged in
        // if token is not set, get token
        // Add the token to the request
        request = request.clone({
            setHeaders: { Authorization: this._token }
        });
        return next.handle(request);
    }
}