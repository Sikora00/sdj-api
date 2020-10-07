import { AccessToken } from '@sdj/shared/auth/core/domain';

export abstract class TokenPersistenceService {
  abstract exists(): boolean;

  abstract get(): AccessToken;

  abstract save(accessToken: AccessToken): void;
}
