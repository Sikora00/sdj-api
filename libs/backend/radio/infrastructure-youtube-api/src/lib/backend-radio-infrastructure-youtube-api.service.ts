import { HttpService, Injectable } from '@nestjs/common';
import {
  TrackDataDto,
  TrackDataService,
} from '@sdj/backend/radio/core/application-services';
import {
  connectionConfig,
  VideoMetadata,
  YoutubeIdError,
} from '@sdj/backend/shared/domain';
import parseIsoDuration from 'parse-iso-duration';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class BackendRadioInfrastructureYoutubeApiService
  implements TrackDataService {
  constructor(private http: HttpService) {}

  async loadTrackData(id: string): Promise<TrackDataDto> {
    return this.http
      .get<{ items: VideoMetadata[] }>(
        `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails,snippet&key=${connectionConfig.youtube.apiKey}`
      )
      .pipe(
        map((res) => res.data.items[0]),
        tap((metadata) => {
          if (!metadata) {
            throw new YoutubeIdError(
              `Id '${id}' is invalid or there was issue with fetching Youtube API.`
            );
          }
          if (
            metadata.contentDetails &&
            metadata.contentDetails.regionRestriction &&
            metadata.contentDetails.regionRestriction.blocked &&
            metadata.contentDetails.regionRestriction.blocked.indexOf('PL') !==
              -1
          ) {
            throw new Error('Youtube video is blocked');
          }
        }),
        map((metadata) => ({
          title: metadata.snippet.title,
          duration: parseIsoDuration(metadata.contentDetails.duration),
        }))
      )
      .toPromise();
  }
}
