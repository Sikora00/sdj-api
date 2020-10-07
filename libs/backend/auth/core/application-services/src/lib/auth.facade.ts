import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { LoginQuery } from './queries/login/login.query';
import { LoginReadModel } from './queries/login/login.read-model';

@Injectable()
export class AuthFacade {
  constructor(private queryBus: QueryBus) {}

  login(query: LoginQuery): Promise<LoginReadModel> {
    return this.queryBus.execute(query);
  }
}
