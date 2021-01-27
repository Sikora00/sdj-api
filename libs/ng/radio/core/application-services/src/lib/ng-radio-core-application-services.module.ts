import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ExternalRadioFacade } from './external-radio.facade';
import { NgCoreQueuedTrackApplicationServicesModule } from './queued-track/ng-core-queued-track-application-services.module';
import { RadioFacade } from './radio.facade';
import * as fromRadio from './radio/+state/radio.reducer';
import { JoinHandler } from './radio/commands/join/join.handler';
import { GetAudioSourceHandler } from './radio/queries/get-audio-source.handler';

const HANDLERS = [JoinHandler, GetAudioSourceHandler];

@NgModule({
  providers: [ExternalRadioFacade, RadioFacade],
  imports: [
    NgCoreQueuedTrackApplicationServicesModule,
    EffectsModule.forFeature(HANDLERS),
    StoreModule.forFeature(fromRadio.RADIO_FEATURE_KEY, fromRadio.reducer),
  ],
})
export class NgRadioCoreApplicationServicesModule {}
