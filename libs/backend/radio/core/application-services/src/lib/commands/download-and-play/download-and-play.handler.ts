import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { PlayQueuedTrackEvent } from '@sdj/backend/radio/core/domain';
import { RadioFacade } from '../../radio.facade';
import { DownloadTrackCommand } from '../download-track/download-track.command';
import { DownloadAndPlayCommand } from './download-and-play.command';

@CommandHandler(DownloadAndPlayCommand)
export class DownloadAndPlayHandler
  implements ICommandHandler<DownloadAndPlayCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly radioFacade: RadioFacade
  ) {}

  async execute(command: DownloadAndPlayCommand): Promise<void> {
    const track = command.queuedTrack.track;
    await this.radioFacade.downloadTrack(new DownloadTrackCommand(track.id));
    return this.eventBus.publish(
      new PlayQueuedTrackEvent(command.queuedTrack.id)
    );
  }
}
