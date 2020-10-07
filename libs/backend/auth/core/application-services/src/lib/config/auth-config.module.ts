import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthConfigService } from './auth-config.service';
import authConfig from './auth.configuration';

@Global()
@Module({
  imports: [ConfigModule.forFeature(authConfig)],
  exports: [AuthConfigService],
  providers: [AuthConfigService],
})
export class AuthConfigModule {}
