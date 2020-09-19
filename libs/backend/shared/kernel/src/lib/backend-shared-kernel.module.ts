import { Global, Module } from '@nestjs/common';
import { BackendSharedInfrastructureHttpHostServiceModule } from '@sdj/backend/shared/infrastructure-http-host-service';
import { LoggerModule } from '@sdj/backend/shared/infrastructure-logger';
import { TypeOrmRootModule } from './type-orm-root.module';

@Global()
@Module({
  imports: [
    TypeOrmRootModule,
    LoggerModule,
    BackendSharedInfrastructureHttpHostServiceModule,
  ],
  exports: [
    TypeOrmRootModule,
    LoggerModule,
    BackendSharedInfrastructureHttpHostServiceModule,
  ],
})
export class BackendSharedKernelModule {}
