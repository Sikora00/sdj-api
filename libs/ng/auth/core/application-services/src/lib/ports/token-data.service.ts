import { Observable } from 'rxjs';

export abstract class TokenDataService {
  abstract getAccessToken(code: string): Observable<string>;

  abstract getToken(): string | null;
  abstract setToken(token: string): void;

  abstract removeToken(): void;
}
