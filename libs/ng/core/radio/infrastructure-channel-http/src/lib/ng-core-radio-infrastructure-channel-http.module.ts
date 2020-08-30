import { NgModule } from '@angular/core';
import { ChannelDataService } from '@sdj/ng/core/radio/application-services';
import { NgCoreSharedInfrastructureSlackModule } from '@sdj/ng/core/shared/infrastructure-slack';
import { ChannelRepositoryAdapter } from './channel-repository.adapter';

@NgModule({
  imports: [NgCoreSharedInfrastructureSlackModule],
  providers: [
    { provide: ChannelDataService, useClass: ChannelRepositoryAdapter }
  ]
})
export class NgCoreRadioInfrastructureChannelHttpModule {}
