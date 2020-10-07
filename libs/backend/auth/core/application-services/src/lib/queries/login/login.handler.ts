import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { SlackApiService } from '@sdj/shared/domain';
import { LoginQuery } from './login.query';
import { LoginReadModel } from './login.read-model';

@QueryHandler(LoginQuery)
export class LoginHandler implements IQueryHandler<LoginQuery> {
  constructor(
    private slackApiService: SlackApiService,
    private jwtService: JwtService
  ) {}

  async execute(query: LoginQuery): Promise<LoginReadModel> {
    const userId = await this.slackApiService.getUserId(query.token);
    const payload = { id: userId, token: query.token };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
