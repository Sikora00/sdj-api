import { Injectable } from '@nestjs/common';
import {
  GetChannelsQuery,
  RadioFacade,
} from '@sdj/backend/radio/core/application-services';
import { WebSocketEvents } from '@sdj/shared/domain';
import { Gateway } from './gateway';

@Injectable()
export class ChannelListEmitter {
  constructor(private gateway: Gateway, private radioFacade: RadioFacade) {}

  async emitChannelList(): Promise<void> {
    this.gateway.server
      .of('/')
      .emit(
        WebSocketEvents.channels,
        await this.radioFacade.getChannels(new GetChannelsQuery())
      );
  }
}
