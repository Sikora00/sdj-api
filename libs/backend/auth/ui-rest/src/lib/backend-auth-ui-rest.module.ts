import { Module } from '@nestjs/common';
import { BackendAuthCoreApplicationServicesModule } from '@sdj/backend/auth/core/application-services';

import { BackendAuthUiRestController } from './backend-auth-ui-rest.controller';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [BackendAuthCoreApplicationServicesModule],
  controllers: [BackendAuthUiRestController],
  providers: [JwtStrategy],
})
export class BackendAuthUiRestModule {}
