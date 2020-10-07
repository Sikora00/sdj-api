import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  ChannelRepositoryInterface,
  ChannelUpdatedEvent,
} from '@sdj/backend/radio/core/domain';
import { WebSocketEvents } from '@sdj/shared/domain';
import { Gateway } from '../../gateway/gateway';

@EventsHandler(ChannelUpdatedEvent)
export class WsChannelUpdatedHandler
  implements IEventHandler<ChannelUpdatedEvent> {
  constructor(
    private gateway: Gateway,
    private channelRepository: ChannelRepositoryInterface
  ) {}

  async handle(event: ChannelUpdatedEvent): Promise<void> {
    await this.gateway.server
      .of('/')
      .emit(
        WebSocketEvents.channels,
        await this.channelRepository.findOrFail(event.channelId)
      );
  }
}
