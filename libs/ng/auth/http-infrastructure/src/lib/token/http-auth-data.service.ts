import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDataService } from '@sdj/ng/auth/core/application-services';
import { environment } from '@sdj/ng/shared/core/domain';
import { AccessToken } from '@sdj/shared/auth/core/domain';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class HttpAuthDataService implements AuthDataService {
  private endpoints = {
    login: `${environment.apiUrl}/auth/login`,
  };

  constructor(private http: HttpClient) {}

  login(code: string): Observable<AccessToken> {
    return this.http
      .get<{ access_token: string }>('https://slack.com/api/oauth.access', {
        params: {
          client_id: environment.slack.clientId,
          client_secret: environment.slack.clientSecret,
          code,
          redirect_uri: window.location.origin,
        },
      })
      .pipe(
        map((response) => response.access_token),
        switchMap((token) =>
          this.http
            .post<{ accessToken: AccessToken }>(this.endpoints.login, { token })
            .pipe(map((res) => res.accessToken))
        )
      );
  }
}
