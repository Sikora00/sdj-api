import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthApiFacade } from '@sdj/ng/core/auth/api';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authFacade: AuthApiFacade) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.body.error) {
          this.handleError(event.body.error);
        }
      })
    );
  }

  handleError(error: string): void {
    switch (error) {
      case 'token_revoked':
      case 'missing_scope':
        this.authFacade.removeToken();
        location.reload();
    }
  }
}
