import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  ChannelRepositoryInterface,
  PlayQueuedTrackEvent,
  QueuedTrackRepositoryInterface,
} from '@sdj/backend/radio/core/domain';

@EventsHandler(PlayQueuedTrackEvent)
export class PlayQueuedTrackHandler
  implements IEventHandler<PlayQueuedTrackEvent> {
  constructor(
    private queuedTrackRepository: QueuedTrackRepositoryInterface,
    private channelRepository: ChannelRepositoryInterface,
    private publisher: EventPublisher
  ) {}

  async handle(event: PlayQueuedTrackEvent): Promise<void> {
    const queuedTrack = await this.queuedTrackRepository.findOneOrFail(
      event.queuedTrackId
    );
    const channelId = queuedTrack.playedIn.id;
    const channel = this.publisher.mergeObjectContext(
      await this.channelRepository.findOrFail(channelId)
    );
    channel.play(queuedTrack);
    await this.channelRepository.save(channel);
    await this.queuedTrackRepository.save(queuedTrack);
    channel.commit();
  }
}
