import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer, TRACK_FEATURE_KEY } from './+state/track.reducer';
import { LoadMostPlayedTracksHandler } from './queries/load-most-played-tracks/load-most-played-tracks.handler';
import { TrackFacade } from './track.facade';

const HANDLERS = [LoadMostPlayedTracksHandler];

@NgModule({
  imports: [
    EffectsModule.forFeature(HANDLERS),
    StoreModule.forFeature(TRACK_FEATURE_KEY, reducer),
  ],
  providers: [TrackFacade],
})
export class NgCoreTrackApplicationServicesModule {}
