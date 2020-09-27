import { Global, Module } from '@nestjs/common';
import { connectionConfig } from '@sdj/backend/shared/domain';
import { BackendSharedInfrastructureHttpHostServiceModule } from '@sdj/backend/shared/infrastructure-http-host-service';
import { LoggerModule } from '@sdj/backend/shared/infrastructure-logger';
import { SlackBotModule } from '@sikora00/nestjs-slack-bot';
import { TypeOrmRootModule } from './type-orm-root.module';

@Global()
@Module({
  imports: [
    SlackBotModule.forRoot({ slackToken: connectionConfig.slack.token }),
    TypeOrmRootModule,
    LoggerModule,
    BackendSharedInfrastructureHttpHostServiceModule,
  ],
  exports: [
    TypeOrmRootModule,
    LoggerModule,
    BackendSharedInfrastructureHttpHostServiceModule,
    SlackBotModule,
  ],
})
export class BackendSharedKernelModule {}
