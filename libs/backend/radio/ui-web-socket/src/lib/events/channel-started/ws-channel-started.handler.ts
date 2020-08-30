import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  ChannelDomainRepository,
  ChannelStartedEvent
} from '@sdj/backend/radio/core/domain';
import { WebSocketEvents } from '@sdj/shared/domain';
import { Gateway } from '../../gateway/gateway';

@EventsHandler(ChannelStartedEvent)
export class WsChannelStartedHandler
  implements IEventHandler<ChannelStartedEvent> {
  constructor(
    private channelRepository: ChannelDomainRepository,
    private gateway: Gateway
  ) {}

  async handle(event: ChannelStartedEvent): Promise<void> {
    const channel = await this.channelRepository.findOrFail(event.channelId);
    this.gateway.server.in(channel.id).emit(WebSocketEvents.roomIsRunning);
  }
}
