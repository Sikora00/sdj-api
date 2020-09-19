import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthFacade } from '@sdj/ng/auth/core/application-services';
import { environment } from '@sdj/ng/shared/core/domain';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authFacade: AuthFacade, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    if (code) {
      return this.authFacade.getAccessToken(code).pipe(
        tap(() => {
          this.router.navigate([], {
            queryParams: {
              code: null,
            },
            queryParamsHandling: 'merge',
          });
        }),
        switchMap(() => of(true))
      );
    } else if (!this.authFacade.isUserLogged()) {
      window.location.href = `https://slack.com/oauth/authorize?scope=identity.basic&scope=groups:read,channels:read,mpim:read,im:read&client_id=${environment.slack.clientId}&redirect_uri=&state=&user_scope=&granular_bot_scope=0&team=&install_redirect=&single_channel=0&tracked=1&redirect_uri=${window.location.origin}`;
    } else {
      return true;
    }
  }
}
