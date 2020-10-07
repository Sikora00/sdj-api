import { Module } from '@nestjs/common';
import { BackendAuthUiRestModule } from '@sdj/backend/auth/ui-rest';
import { BackendRadioUiRedisModule } from '@sdj/backend/radio/ui-redis';
import { BackendRadioUiRestModule } from '@sdj/backend/radio/ui-rest';
import { SlackModule } from '@sdj/backend/radio/ui-slack';
import { WebSocketModule } from '@sdj/backend/radio/ui-web-socket';
import { BackendSharedKernelModule } from '@sdj/backend/shared/kernel';

@Module({
  imports: [
    BackendAuthUiRestModule,
    BackendSharedKernelModule,
    BackendRadioUiRestModule,
    WebSocketModule,
    BackendRadioUiRedisModule,
    SlackModule,
  ],
})
export class AppModule {}
