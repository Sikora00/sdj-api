import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PozdroEvent } from '@sdj/backend/radio/core/application-services';
import { WebSocketEvents } from '@sdj/shared/domain';
import { Gateway } from '../../gateway/gateway';

@EventsHandler(PozdroEvent)
export class WsPozdroHandler implements IEventHandler<PozdroEvent> {
  constructor(private logger: Logger, private gateway: Gateway) {}

  async handle(event: PozdroEvent): Promise<void> {
    this.gateway.server.in(event.channelId).emit(WebSocketEvents.pozdro, {
      message: event.text,
    });
  }
}
