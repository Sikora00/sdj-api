import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QueuedTrack } from '@sdj/backend/radio/core/domain';
import { QueuedTrackDomainRepository } from '@sdj/backend/radio/core/domain-service';
import { Store } from '@sdj/backend/radio/infrastructure';
import { PlayQueuedTrackEvent } from './play-queued-track.event';

@EventsHandler(PlayQueuedTrackEvent)
export class PlayQueuedTrackHandler
  implements IEventHandler<PlayQueuedTrackEvent> {
  constructor(
    private readonly storageService: Store,
    private queuedTrackRepository: QueuedTrackDomainRepository
  ) {}

  async handle(event: PlayQueuedTrackEvent): Promise<unknown> {
    const queuedTrack = await this.queuedTrackRepository.findOneOrFail(
      event.queuedTrackId
    );
    const channelId = queuedTrack.playedIn.id;
    const prevTrack = await this.storageService.getCurrentTrack(channelId);
    if (prevTrack) {
      await this.storageService.removeFromQueue(prevTrack);
    }
    await this.storageService.setCurrentTrack(channelId, queuedTrack);
    await this.updateQueuedTrackPlayedAt(queuedTrack);
    return this.storageService.setSilenceCount(channelId, 0);
  }

  updateQueuedTrackPlayedAt(
    queuedTrack: QueuedTrack,
    playedAt?: Date
  ): Promise<QueuedTrack> {
    queuedTrack.playedAt = playedAt || new Date();
    return this.queuedTrackRepository.save(queuedTrack);
  }
}
