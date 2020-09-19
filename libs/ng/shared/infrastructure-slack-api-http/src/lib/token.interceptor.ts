import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { AuthFacade } from '@sdj/ng/auth/core/application-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthFacade) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      request.url.includes('https://slack.com/api') &&
      this.auth.isUserLogged()
    ) {
      request = request.clone({
        setParams: {
          token: this.auth.getToken()
        }
      });
    }
    return next.handle(request);
  }
}
