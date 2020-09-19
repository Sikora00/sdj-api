import { Injectable, Logger } from '@nestjs/common';
import { RedisController } from '../controllers/redis.controller';
import { RedisService } from './redis.service';

enum RedisMessages {
  GetNextSong = 'getNext',
}

@Injectable()
export class RedisRouter {
  constructor(
    private controller: RedisController,
    private logger: Logger,
    private redisService: RedisService
  ) {
    this.routeRedisMessages();
  }

  private async routeRedisMessages(): Promise<void> {
    const redisMessages$ = this.redisService.createSubject<string>('message');

    redisMessages$.subscribe(({ channel, message }) => {
      this.logger.log(channel, message);
      switch (
        channel //For redis getNext is a channel and messages sent in there is a channelId
      ) {
        case RedisMessages.GetNextSong:
          this.controller.getNextSong(message);
          break;
      }
    });
  }
}
