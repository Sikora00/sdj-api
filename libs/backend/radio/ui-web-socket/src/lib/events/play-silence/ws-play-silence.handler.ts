import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PlaySilenceEvent } from '@sdj/backend/radio/core/domain';
import { WebSocketEvents } from '@sdj/shared/domain';
import { Gateway } from '../../gateway/gateway';

@EventsHandler(PlaySilenceEvent)
export class WsPlaySilenceHandler implements IEventHandler<PlaySilenceEvent> {
  constructor(private logger: Logger, private gateway: Gateway) {}

  async handle(command: PlaySilenceEvent): Promise<void> {
    const channelId = command.channelId;
    this.logger.log('radio', channelId);
    this.gateway.server.in(channelId).emit(WebSocketEvents.playRadio);
  }
}
