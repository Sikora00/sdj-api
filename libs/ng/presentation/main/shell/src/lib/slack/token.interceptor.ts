import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthFacade } from '@sdj/ng/core/auth/application-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthFacade) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.isUserLogged()) {
      request = request.clone({
        setParams: {
          token: this.auth.getToken()
        }
      });
    }
    return next.handle(request);
  }
}
