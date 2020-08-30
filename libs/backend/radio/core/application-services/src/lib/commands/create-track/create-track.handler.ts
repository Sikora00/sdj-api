import { Logger } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Track, TrackDomainRepository } from '@sdj/backend/radio/core/domain';
import {
  connectionConfig,
  VideoMetadata,
  YoutubeIdError
} from '@sdj/backend/shared/domain';
import { getDuration } from '@sdj/backend/shared/util-mp3';
import parseIsoDuration from 'parse-iso-duration';
import * as requestPromise from 'request-promise-native'; //ToDo use axios from infrastructure
import { DownloadTrackCommand } from '../download-track/download-track.command';
import { CreateTrackCommand } from './create-track.command';

@CommandHandler(CreateTrackCommand)
export class CreateTrackHandler implements ICommandHandler<CreateTrackCommand> {
  constructor(
    private commandBus: CommandBus,
    private readonly logger: Logger,
    private trackRepository: TrackDomainRepository
  ) {}

  async execute(command: CreateTrackCommand): Promise<void> {
    const id = command.id;
    const res = await requestPromise.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails,snippet&key=${connectionConfig.youtube.apiKey}`
    );
    const metadata: VideoMetadata = JSON.parse(res).items[0];

    if (!metadata) {
      throw new YoutubeIdError(
        `Id '${id}' is invalid or there was issue with fetching Youtube API.`
      );
    }

    if (
      metadata.contentDetails &&
      metadata.contentDetails.regionRestriction &&
      metadata.contentDetails.regionRestriction.blocked &&
      metadata.contentDetails.regionRestriction.blocked.indexOf('PL') !== -1
    ) {
      throw new Error('blocked');
    }

    if (parseIsoDuration(metadata.contentDetails.duration) > 7 * 60 * 1000) {
      throw new Error('video too long');
    }

    const track = new Track(
      metadata.id,
      metadata.snippet.title,
      command.addedBy
    );
    await this.trackRepository.save(track);

    await this.commandBus.execute(new DownloadTrackCommand(id));
    const duration = await getDuration(track.id).toPromise();
    track.duration = parseInt(duration, 10);
    track.createdAt = new Date();
    await this.trackRepository.save(track);
  }
}
