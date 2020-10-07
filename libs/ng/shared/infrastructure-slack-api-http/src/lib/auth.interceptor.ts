import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
// tslint:disable-next-line:nx-enforce-module-boundaries TODO
import { AuthFacade } from '@sdj/ng/auth/core/application-services';
import { environment } from '@sdj/ng/shared/core/domain';
import { Observable, throwError } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: AuthFacade) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      request.url.includes(environment.apiUrl) &&
      !request.url.includes('login')
    ) {
      return this.auth.accessToken$.pipe(
        switchMap((accessToken) => {
          if (accessToken) {
            return this.addAccessToken(request).pipe(
              switchMap((req) => next.handle(req)),
              catchError((error: HttpErrorResponse) => {
                if (error && error.status === 401) {
                  return this.authenticateAndResend(request, next);
                } else {
                  return throwError(error);
                }
              })
            );
          } else {
            return this.authenticateAndResend(request, next);
          }
        })
      );
    }
    return next.handle(request);
  }

  private authenticateAndResend(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.auth.login().pipe(
      switchMap(() => this.addAccessToken(request)),
      switchMap((req) => next.handle(req)),
      catchError((err) => throwError(err))
    );
  }

  private addAccessToken(
    request: HttpRequest<any>
  ): Observable<HttpRequest<any>> {
    return this.auth.accessToken$.pipe(
      first((token) => !!token),
      map((token) =>
        request.clone({
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
        })
      )
    );
  }
}
