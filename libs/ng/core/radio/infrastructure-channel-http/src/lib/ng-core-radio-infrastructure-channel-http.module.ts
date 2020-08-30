import { NgModule } from '@angular/core';
import { ChannelRepository } from '@sdj/ng/core/radio/domain';
import { NgCoreSharedInfrastructureSlackModule } from '@sdj/ng/core/shared/infrastructure-slack';
import { ChannelRepositoryAdapter } from './channel-repository.adapter';

@NgModule({
  imports: [NgCoreSharedInfrastructureSlackModule],
  providers: [
    { provide: ChannelRepository, useClass: ChannelRepositoryAdapter }
  ]
})
export class NgCoreRadioInfrastructureChannelHttpModule {}
