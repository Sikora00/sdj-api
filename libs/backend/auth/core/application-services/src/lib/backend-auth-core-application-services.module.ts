import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthFacade } from './auth.facade';
import { AuthConfigModule } from './config/auth-config.module';
import { AuthConfigService } from './config/auth-config.service';
import { LoginHandler } from './queries/login/login.handler';

@Module({
  imports: [
    AuthConfigModule,
    CqrsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [AuthConfigService],
      useFactory: async (configService: AuthConfigService) => ({
        secret: configService.secret,
      }),
    }),
  ],
  providers: [AuthFacade, LoginHandler],
  exports: [AuthFacade],
})
export class BackendAuthCoreApplicationServicesModule {}
