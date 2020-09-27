import { Global, Module } from '@nestjs/common';
import { BackendSharedInfrastructureHttpHostServiceModule } from '@sdj/backend/shared/infrastructure-http-host-service';
import { LoggerModule } from '@sdj/backend/shared/infrastructure-logger';
import { SlackBotTestingModule } from '@sikora00/nestjs-slack-bot';
import { TypeOrmRootModule } from './type-orm-root.module';

@Global()
@Module({
  imports: [
    SlackBotTestingModule,
    TypeOrmRootModule,
    LoggerModule,
    BackendSharedInfrastructureHttpHostServiceModule,
  ],
  exports: [
    TypeOrmRootModule,
    LoggerModule,
    BackendSharedInfrastructureHttpHostServiceModule,
    SlackBotTestingModule,
  ],
})
export class BackendSharedTestingKernelModule {}
