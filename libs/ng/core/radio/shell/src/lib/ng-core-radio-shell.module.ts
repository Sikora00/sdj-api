import { NgModule } from '@angular/core';
import { NgCoreRadioApplicationServicesModule } from '@sdj/ng/core/radio/application-services';
import { NgCoreRadioInfrastructureModule } from '@sdj/ng/core/radio/infrastructure';
import { NgCoreRadioInfrastructureChannelHttpModule } from '@sdj/ng/core/radio/infrastructure-channel-http';
import { NgCoreSharedInfrastructureApolloModule } from '@sdj/ng/core/shared/infrastructure-apollo';
import { SpeechServiceAdapter } from '@sdj/ng/core/shared/infrastructure-speech';
import { NgCoreSharedInfrastructureWebSocketModule } from '@sdj/ng/core/shared/infrastructure-web-socket';
import { SpeechService } from '@sdj/ng/core/shared/port';

@NgModule({
  imports: [
    NgCoreRadioInfrastructureModule,
    NgCoreRadioApplicationServicesModule,
    NgCoreSharedInfrastructureApolloModule,
    NgCoreSharedInfrastructureWebSocketModule,
    NgCoreRadioInfrastructureChannelHttpModule
  ],
  providers: [{ provide: SpeechService, useClass: SpeechServiceAdapter }]
})
export class NgCoreRadioShellModule {}
