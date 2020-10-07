import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@sdj/ng/shared/core/domain';
import { AccessToken } from '@sdj/shared/auth/core/domain';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthDataService } from './ports/auth-data.service';
import { TokenPersistenceService } from './ports/token-persistence.service';

@Injectable()
export class AuthFacade {
  private _accessToken = new BehaviorSubject(
    this.tokenPersistenceService.get()
  );
  accessToken$ = this._accessToken.asObservable();

  constructor(
    private router: Router,
    private tokenPersistenceService: TokenPersistenceService,
    private authDataService: AuthDataService
  ) {}

  getAccessToken(code: string): Observable<AccessToken> {
    return this.authDataService.login(code).pipe(
      tap((token) => {
        this._accessToken.next(token);
        this.tokenPersistenceService.save(token);
      })
    );
  }

  login(): Observable<AccessToken | void> {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    if (code) {
      return this.authenticateWithCode(code);
    } else {
      return this.redirectToSlackAuth();
    }
  }

  private authenticateWithCode(code: string): Observable<AccessToken> {
    return this.getAccessToken(code).pipe(
      tap(() => {
        this.router.navigate([], {
          queryParams: {
            code: null,
          },
          queryParamsHandling: 'merge',
        });
      })
    );
  }

  private redirectToSlackAuth(): Observable<void> {
    window.location.href = `https://slack.com/oauth/authorize?user_scope=identity.basic&scope=groups:read,channels:read,mpim:read,im:read&client_id=${environment.slack.clientId}&redirect_uri=${window.location.origin}`;
    return of();
  }
}
