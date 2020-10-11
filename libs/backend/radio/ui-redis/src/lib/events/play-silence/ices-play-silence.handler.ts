import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PlaySilenceEvent } from '@sdj/backend/radio/core/domain';
import { RedisService } from '../../services/redis.service';

@EventsHandler(PlaySilenceEvent)
export class IcesPlaySilenceHandler implements IEventHandler<PlaySilenceEvent> {
  constructor(private redisService: RedisService) {}

  async handle(command: PlaySilenceEvent): Promise<unknown> {
    return this.redisService
      .getNextSongSubject(command.channelId)
      .next(<any>'10-sec-of-silence');
  }
}
