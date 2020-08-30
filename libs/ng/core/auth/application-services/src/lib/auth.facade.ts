import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenDataService } from './ports/token-data.service';

@Injectable()
export class AuthFacade {
  private token: string | null = null;

  constructor(private tokenRepository: TokenDataService) {
    this.token = tokenRepository.getToken();
  }

  isUserLogged(): boolean {
    return !!this.token;
  }

  getToken(): string {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
    this.tokenRepository.setToken(token);
  }

  getAccessToken(code: string): Observable<string> {
    const source$ = this.tokenRepository.getAccessToken(code);
    source$.subscribe(token => this.setToken(token));
    return source$;
  }

  removeToken(): void {
    this.tokenRepository.removeToken();
  }
}
