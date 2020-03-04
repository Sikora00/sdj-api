import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import {
  QueuedTrackDomainRepository,
  TrackDomainRepository
} from '@sdj/backend/radio/core/domain-service';
import { HostService } from '@sdj/backend/shared/port';
import { QueuedTrackSkippedEvent } from '../../events/queued-track-skiepped/queued-track-skipped.event';
import { SkipQueuedTrackCommand } from './skip-queued-track.command';

@CommandHandler(SkipQueuedTrackCommand)
export class SkipQueuedTrackHandler
  implements ICommandHandler<SkipQueuedTrackCommand> {
  constructor(
    private eventBus: EventBus,
    private hostService: HostService,
    private queuedTrackRepository: QueuedTrackDomainRepository,
    private trackRepository: TrackDomainRepository
  ) {}

  async execute(command: SkipQueuedTrackCommand): Promise<void> {
    const queuedTrack = await this.queuedTrackRepository.findOneOrFail(
      command.queuedTrackId
    );
    await this.hostService.nextSong(queuedTrack.playedIn.id);
    queuedTrack.track.skips++;
    await this.trackRepository.save(queuedTrack.track);
    this.eventBus.publish(new QueuedTrackSkippedEvent(queuedTrack.id));
  }
}