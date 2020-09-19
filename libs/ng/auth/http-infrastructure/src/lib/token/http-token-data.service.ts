import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenDataService } from '@sdj/ng/auth/core/application-services';
import { environment } from '@sdj/ng/shared/core/domain';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpTokenDataService implements TokenDataService {
  constructor(private http: HttpClient) {}

  getAccessToken(code: string): Observable<string> {
    return this.http
      .get<{ access_token: string }>('https://slack.com/api/oauth.access', {
        params: {
          client_id: environment.slack.clientId,
          client_secret: environment.slack.clientSecret,
          code,
          redirect_uri: window.location.origin,
        },
      })
      .pipe(map((response) => response.access_token));
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    window.localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
