import { NgModule } from '@angular/core';
import { TrackDataService } from '@sdj/ng/radio/core/application-services';
import { ApolloTrackDataService } from './apollo-track-data.service';

@NgModule({
  providers: [
    {
      provide: TrackDataService,
      useClass: ApolloTrackDataService,
    },
  ],
})
export class NgRadioInfrastructureTrackApolloModule {}
