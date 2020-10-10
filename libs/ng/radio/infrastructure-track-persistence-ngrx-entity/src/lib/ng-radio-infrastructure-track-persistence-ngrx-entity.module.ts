import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TrackPersistenceService } from '@sdj/ng/radio/core/application-services';
import { reducer, trackFeatureKey } from './+state/track.reducer';
import { NgrxEntityTrackPersistenceService } from './ngrx-entity-track-persistence.service';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(trackFeatureKey, reducer)],
  providers: [
    {
      provide: TrackPersistenceService,
      useClass: NgrxEntityTrackPersistenceService,
    },
  ],
})
export class NgRadioInfrastructureTrackPersistenceNgrxEntityModule {}
