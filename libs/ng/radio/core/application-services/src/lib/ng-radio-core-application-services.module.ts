import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ChannelFacade } from '@sdj/ng/radio/core/domain';
import { CHANNEL_FEATURE_KEY, reducer } from './channel/+state/channel.reducer';
import { NgrxChannelFacade } from './channel/ngrx-channel.facade';
import { LoadChannelsHandler } from './channel/queries/load-channels/load-channels.handler';
import { SelectChannelService } from './channel/services/select-channel.service';
import { ExternalRadioFacade } from './external-radio.facade';
import { NgCoreQueuedTrackApplicationServicesModule } from './queued-track/ng-core-queued-track-application-services.module';
import { RadioFacade } from './radio.facade';
import * as fromRadio from './radio/+state/radio.reducer';
import { JoinHandler } from './radio/commands/join/join.handler';
import { GetAudioSourceHandler } from './radio/queries/get-audio-source.handler';
import { NgCoreTrackApplicationServicesModule } from './track/ng-core-track-application-services.module';

const HANDLERS = [JoinHandler, GetAudioSourceHandler];
const CHANNEL_HANDLERS = [LoadChannelsHandler];

@NgModule({
  providers: [
    ExternalRadioFacade,
    RadioFacade,
    {
      provide: ChannelFacade,
      useClass: NgrxChannelFacade
    },
    SelectChannelService
  ],
  imports: [
    NgCoreQueuedTrackApplicationServicesModule,
    NgCoreTrackApplicationServicesModule,
    EffectsModule.forFeature(HANDLERS),
    StoreModule.forFeature(fromRadio.RADIO_FEATURE_KEY, fromRadio.reducer),
    EffectsModule.forFeature(CHANNEL_HANDLERS),
    StoreModule.forFeature(CHANNEL_FEATURE_KEY, reducer)
  ]
})
export class NgRadioCoreApplicationServicesModule {}
