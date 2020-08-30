import { NgModule } from '@angular/core';
import { TrackDataService } from '@sdj/ng/core/radio/application-services';
import { ApolloTrackDataService } from './apollo-track-data.service';

@NgModule({
  providers: [
    {
      provide: TrackDataService,
      useClass: ApolloTrackDataService
    }
  ]
})
export class NgCoreRadioInfrastructureTrackApolloModule {}
