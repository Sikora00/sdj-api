import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgRadioInfrastructureTrackPersistenceNgrxEntityModule } from '@sdj/ng/radio/infrastructure-track-persistence-ngrx-entity';
import { NgSharedUiSdjLoaderModule } from '@sdj/ng/shared/presentation-sdj-loader';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import {
  MOST_PLAYED_TRACKS_FEATURE_KEY,
  reducer,
} from './application/+state/most-played-tracks.reducer';
import { MostPlayedTracksFacade } from './application/most-played-tracks.facade';
import { LoadMostPlayedTracksHandler } from './application/queries/load-most-played-tracks/load-most-played-tracks.handler';
import { MostPlayedComponent } from './containers/most-played/most-played.component';

const HANDLERS = [LoadMostPlayedTracksHandler];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: MostPlayedComponent }]),
    NgxAudioPlayerModule,
    NgSharedUiSdjLoaderModule,
    EffectsModule.forFeature(HANDLERS),
    StoreModule.forFeature(MOST_PLAYED_TRACKS_FEATURE_KEY, reducer),
    NgRadioInfrastructureTrackPersistenceNgrxEntityModule,
  ],
  providers: [MostPlayedTracksFacade],
  declarations: [MostPlayedComponent],
})
export class NgMostPlayedFeatureModule {}
