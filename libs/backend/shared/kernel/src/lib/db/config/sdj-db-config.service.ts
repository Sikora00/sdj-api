import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SdjDbConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('db.host');
  }

  get name(): string {
    return this.configService.get<string>('db.name');
  }

  get password(): string {
    return this.configService.get<string>('db.password');
  }

  get user(): string {
    return this.configService.get<string>('db.user');
  }
}
