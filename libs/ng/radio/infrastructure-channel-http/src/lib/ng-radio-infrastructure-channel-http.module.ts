import { NgModule } from '@angular/core';
import { ChannelDataService } from '@sdj/ng/radio/core/application-services';
import { NgSharedInfrastructureSlackApiHttpModule } from '@sdj/ng/shared/infrastructure-slack-api-http';
import { ChannelRepositoryAdapter } from './channel-repository.adapter';

@NgModule({
  imports: [NgSharedInfrastructureSlackApiHttpModule],
  providers: [
    { provide: ChannelDataService, useClass: ChannelRepositoryAdapter }
  ]
})
export class NgRadioInfrastructureChannelHttpModule {}
