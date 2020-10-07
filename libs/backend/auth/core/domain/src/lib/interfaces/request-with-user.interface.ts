import { TokenPayload } from '@sdj/shared/auth/core/domain';

export interface RequestWithUser extends Request {
  user: TokenPayload;
}
