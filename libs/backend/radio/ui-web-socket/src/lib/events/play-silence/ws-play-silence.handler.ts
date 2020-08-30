import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  PlaySilenceEvent,
  Store
} from '@sdj/backend/radio/core/application-services';
import { WebSocketEvents } from '@sdj/shared/domain';
import { Gateway } from '../../gateway/gateway';

@EventsHandler(PlaySilenceEvent)
export class WsPlaySilenceHandler implements IEventHandler<PlaySilenceEvent> {
  constructor(
    private logger: Logger,
    private gateway: Gateway,
    private readonly storageService: Store
  ) {}

  async handle(command: PlaySilenceEvent): Promise<void> {
    const channelId = command.channelId;
    let count = await this.storageService.getSilenceCount(channelId);
    count++;
    if (count > 1) {
      this.logger.log('radio', channelId);
      this.gateway.server.in(channelId).emit(WebSocketEvents.playRadio);
    }
  }
}
