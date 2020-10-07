import { AccessToken } from '@sdj/shared/auth/core/domain';
import { Observable } from 'rxjs';

export abstract class AuthDataService {
  abstract login(code: string): Observable<AccessToken>;
}
