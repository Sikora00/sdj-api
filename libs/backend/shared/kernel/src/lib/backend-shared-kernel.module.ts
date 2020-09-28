import { Global, HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { connectionConfig } from '@sdj/backend/shared/domain';
import { BackendSharedInfrastructureHttpHostServiceModule } from '@sdj/backend/shared/infrastructure-http-host-service';
import { LoggerModule } from '@sdj/backend/shared/infrastructure-logger';
import { SlackBotModule } from '@sikora00/nestjs-slack-bot';
import { TypeOrmRootModule } from './db/type-orm-root.module';

@Global()
@Module({
  imports: [
    SlackBotModule.forRoot({ slackToken: connectionConfig.slack.token }),
    TypeOrmRootModule,
    LoggerModule,
    BackendSharedInfrastructureHttpHostServiceModule,
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  exports: [
    TypeOrmRootModule,
    LoggerModule,
    BackendSharedInfrastructureHttpHostServiceModule,
    SlackBotModule,
    HttpModule,
  ],
})
export class BackendSharedKernelModule {}
