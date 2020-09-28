import { Logger } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TrackRepositoryInterface } from '@sdj/backend/radio/core/domain';
import { pathConfig } from '@sdj/backend/shared/domain';
import * as fs from 'fs';
import { TrackService } from '../../ports/track.service';
import { DownloadTrackCommand } from './download-track.command';

@CommandHandler(DownloadTrackCommand)
export class DownloadTrackHandler
  implements ICommandHandler<DownloadTrackCommand> {
  constructor(
    private commandBus: CommandBus,
    private readonly logger: Logger,
    private readonly trackRepository: TrackRepositoryInterface,
    private trackService: TrackService
  ) {}

  async execute(command: DownloadTrackCommand): Promise<void> {
    const track = await this.trackRepository.findOneOrFail(command.trackId);
    if (!fs.existsSync(pathConfig.tracks + '/' + track.id + '.mp3')) {
      try {
        await this.trackService.download(track.id);
      } catch (err) {
        this.logger.error(
          "Can't download track " + track.id,
          JSON.stringify(err)
        );
        throw err;
      }
    }
  }
}
