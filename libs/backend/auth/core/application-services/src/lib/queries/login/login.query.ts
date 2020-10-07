import { IQuery } from '@nestjs/cqrs';

export class LoginQuery implements IQuery {
  constructor(public token: string) {}
}
