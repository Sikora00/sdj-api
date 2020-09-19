import { Injectable } from '@nestjs/common';
import {
  PlayNextTrackOrSilenceCommand,
  RadioFacade,
} from '@sdj/backend/radio/core/application-services';

@Injectable()
export class RedisController {
  constructor(private radioFacade: RadioFacade) {}
  getNextSong(channelId: string): Promise<unknown> {
    return this.radioFacade.getNextSong(
      new PlayNextTrackOrSilenceCommand(channelId)
    );
  }
}
