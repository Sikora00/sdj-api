import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthConfigService } from '@sdj/backend/auth/core/application-services';
import { TokenPayload } from '@sdj/shared/auth/core/domain';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: AuthConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.secret,
    });
  }

  async validate(payload: TokenPayload): Promise<any> {
    return payload;
  }
}
