import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  ChannelDomainRepository,
  UserJoinedChannelEvent,
} from '@sdj/backend/radio/core/domain';
import { WebSocketEvents } from '@sdj/shared/domain';
import { Gateway } from '../../gateway/gateway';

@EventsHandler(UserJoinedChannelEvent)
export class WsUserJoinedChannelHandler
  implements IEventHandler<UserJoinedChannelEvent> {
  constructor(
    private channelRepository: ChannelDomainRepository,
    private gateway: Gateway
  ) {}

  async handle(event: UserJoinedChannelEvent): Promise<void> {
    const channel = await this.channelRepository.findOrFail(event.channelId);
    this.gateway.server.in(channel.id).emit(WebSocketEvents.roomIsRunning);
  }
}
