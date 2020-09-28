import { Injectable } from '@nestjs/common';
import { TrackService } from '@sdj/backend/radio/core/application-services';
import { BackendRadioInfrastructureMp3GainService } from '@sdj/backend/radio/infrastructure-mp3-gain';
import { YoutubeTrackService } from '@sdj/backend/radio/infrastructure-youtube-api';
import { Path } from '@sdj/backend/shared/domain';

@Injectable()
export class TrackServiceAdapter implements TrackService {
  downloadInProgress: { [key: string]: Promise<Path> } = {};

  constructor(
    private mp3GainTrackService: BackendRadioInfrastructureMp3GainService,
    private youtubeTrackService: YoutubeTrackService
  ) {}

  async download(id: string): Promise<Path> {
    if (this.downloadInProgress[id]) {
      return this.downloadInProgress[id];
    }

    const filePath = await this.youtubeTrackService.download(id);
    const download = this.mp3GainTrackService
      .normalize(filePath)
      .then(() => filePath);
    this.downloadInProgress[id] = download;
    return download;
  }

  getDuration(trackId: string): Promise<number> {
    return this.mp3GainTrackService.getDuration(trackId);
  }
}
