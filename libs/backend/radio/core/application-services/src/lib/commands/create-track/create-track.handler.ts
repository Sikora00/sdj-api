import { Logger } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  Track,
  TrackRepositoryInterface,
} from '@sdj/backend/radio/core/domain';
import { TrackDataService } from '../../ports/track-data.service';
import { TrackService } from '../../ports/track.service';
import { DownloadTrackCommand } from '../download-track/download-track.command';
import { CreateTrackCommand } from './create-track.command';

@CommandHandler(CreateTrackCommand)
export class CreateTrackHandler implements ICommandHandler<CreateTrackCommand> {
  constructor(
    private commandBus: CommandBus,
    private readonly logger: Logger,
    private trackDataService: TrackDataService,
    private trackRepository: TrackRepositoryInterface,
    private trackService: TrackService
  ) {}

  async execute(command: CreateTrackCommand): Promise<void> {
    const id = command.id;
    const trackData = await this.trackDataService.loadTrackData(id);

    if (trackData.duration > 7 * 60 * 1000) {
      throw new Error('video too long');
    }

    const track = new Track(id, trackData.title, command.addedBy);
    await this.trackRepository.save(track);

    await this.commandBus.execute(new DownloadTrackCommand(id));
    const duration = await this.trackService.getDuration(track.id);
    track.duration = duration;
    track.createdAt = new Date();
    await this.trackRepository.save(track);
  }
}
