import { AggregateRoot } from '@nestjs/cqrs';
import {
  Channel,
  QueuedTrack,
  Track,
  User,
} from '@sdj/backend/radio/core/domain';
import { QueueChangedEvent } from './events/queue-changed.event';

export class RadioAggregate extends AggregateRoot {
  queueTrack(
    track: Track,
    channel: Channel,
    randomized: boolean = false,
    user?: User
  ): QueuedTrack {
    const queuedTrack = new QueuedTrack(track, channel, randomized, user);
    this.apply(new QueueChangedEvent(channel.id));
    return queuedTrack;
  }
}
