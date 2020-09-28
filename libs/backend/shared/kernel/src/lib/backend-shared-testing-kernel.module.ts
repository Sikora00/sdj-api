import { Global, HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BackendSharedInfrastructureHttpHostServiceModule } from '@sdj/backend/shared/infrastructure-http-host-service';
import { LoggerModule } from '@sdj/backend/shared/infrastructure-logger';
import { SlackBotTestingModule } from '@sikora00/nestjs-slack-bot';
import { TypeOrmRootModule } from './db/type-orm-root.module';

@Global()
@Module({
  imports: [
    SlackBotTestingModule,
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
    SlackBotTestingModule,
    HttpModule,
  ],
})
export class BackendSharedTestingKernelModule {}
