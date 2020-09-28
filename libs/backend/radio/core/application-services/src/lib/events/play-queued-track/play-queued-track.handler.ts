import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  QueuedTrack,
  QueuedTrackRepositoryInterface,
} from '@sdj/backend/radio/core/domain';
import { Store } from '../../ports/store.port';
import { PlayQueuedTrackEvent } from './play-queued-track.event';

@EventsHandler(PlayQueuedTrackEvent)
export class PlayQueuedTrackHandler
  implements IEventHandler<PlayQueuedTrackEvent> {
  constructor(
    private readonly storageService: Store,
    private queuedTrackRepository: QueuedTrackRepositoryInterface
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
