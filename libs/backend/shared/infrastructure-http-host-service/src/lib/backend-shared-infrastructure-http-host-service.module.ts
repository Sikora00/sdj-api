import { Module } from '@nestjs/common';
import { HostService } from '@sdj/backend/shared/application-services';
import { HostServiceAdapter } from './host-service.adapter';

@Module({
  providers: [{ provide: HostService, useClass: HostServiceAdapter }],
  exports: [HostService],
})
export class BackendSharedInfrastructureHttpHostServiceModule {}
