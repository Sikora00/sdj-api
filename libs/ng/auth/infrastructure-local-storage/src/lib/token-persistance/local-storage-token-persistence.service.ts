import { Injectable } from '@angular/core';
import { TokenPersistenceService } from '@sdj/ng/auth/core/application-services';
import { AccessToken } from '@sdj/shared/auth/core/domain';

@Injectable()
export class LocalStorageTokenPersistenceService
  implements TokenPersistenceService {
  private static readonly TokenKey = 'token';

  exists(): boolean {
    return (
      localStorage.getItem(LocalStorageTokenPersistenceService.TokenKey) !==
      null
    );
  }

  get(): AccessToken {
    return localStorage.getItem(LocalStorageTokenPersistenceService.TokenKey);
  }

  save(accessToken: AccessToken): void {
    localStorage.setItem(
      LocalStorageTokenPersistenceService.TokenKey,
      accessToken
    );
  }
}
