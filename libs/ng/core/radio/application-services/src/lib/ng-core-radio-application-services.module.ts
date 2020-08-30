import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ChannelFacade } from '@sdj/ng/core/radio/domain';
import * as fromRadio from './+state/radio.reducer';
import { CHANNEL_FEATURE_KEY, reducer } from './channel/+state/channel.reducer';
import { NgrxChannelFacade } from './channel/ngrx-channel.facade';
import { LoadChannelsHandler } from './channel/queries/load-channels/load-channels.handler';
import { JoinHandler } from './commands/join/join.handler';
import { ExternalRadioFacade } from './external-radio.facade';
import { GetAudioSourceHandler } from './queries/get-audio-source.handler';
import { RadioFacade } from './radio.facade';
import { NgCoreTrackApplicationServicesModule } from './track/ng-core-track-application-services.module';

const HANDLERS = [JoinHandler, GetAudioSourceHandler];
const CHANNEL_HANDLERS = [LoadChannelsHandler];

@NgModule({
  providers: [ExternalRadioFacade, RadioFacade, {
    provide: ChannelFacade, useClass: NgrxChannelFacade
  }],
  imports: [
    NgCoreTrackApplicationServicesModule,
    EffectsModule.forFeature(HANDLERS),
    StoreModule.forFeature(fromRadio.RADIO_FEATURE_KEY, fromRadio.reducer),
    EffectsModule.forFeature(CHANNEL_HANDLERS),
    StoreModule.forFeature(CHANNEL_FEATURE_KEY, reducer)
  ]})
export class NgCoreRadioApplicationServicesModule {}
