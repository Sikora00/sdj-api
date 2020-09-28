import { Module } from '@nestjs/common';
import { TrackDataService } from '@sdj/backend/radio/core/application-services';
import { BackendRadioInfrastructureYoutubeApiService } from './backend-radio-infrastructure-youtube-api.service';
import { YoutubeTrackService } from './youtube-track.service';

@Module({
  controllers: [],
  providers: [
    {
      provide: TrackDataService,
      useClass: BackendRadioInfrastructureYoutubeApiService,
    },
    YoutubeTrackService,
  ],
  exports: [TrackDataService, YoutubeTrackService],
})
export class BackendRadioInfrastructureYoutubeApiModule {}
