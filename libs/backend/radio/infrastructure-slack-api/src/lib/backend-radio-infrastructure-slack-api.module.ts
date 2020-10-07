import { Module } from '@nestjs/common';
import { SlackApiService } from '@sdj/shared/domain';
import { HttpSlackApiService } from './http-slack-api.service';

@Module({
  providers: [{ provide: SlackApiService, useClass: HttpSlackApiService }],
  exports: [SlackApiService],
})
export class BackendRadioInfrastructureSlackApiModule {}
