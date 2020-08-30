import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PlayQueuedTrackEvent } from '@sdj/backend/radio/core/application-services';
import { QueuedTrackDomainRepository } from '@sdj/backend/radio/core/domain';
import { RedisService } from '../../services/redis.service';

@EventsHandler(PlayQueuedTrackEvent)
export class IcesPlayQueuedTrackHandler
  implements IEventHandler<PlayQueuedTrackEvent> {
  constructor(
    private readonly redisService: RedisService,
    private queuedTrackRepository: QueuedTrackDomainRepository
  ) {}

  async handle(event: PlayQueuedTrackEvent): Promise<void> {
    const queuedTrack = await this.queuedTrackRepository.findOneOrFail(
      event.queuedTrackId
    );
    const channelId = queuedTrack.playedIn.id;
    const track = queuedTrack.track;
    this.redisService.sendNextSong(channelId, track);
  }
}
