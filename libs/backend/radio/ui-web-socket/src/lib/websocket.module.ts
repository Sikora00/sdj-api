import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ChannelRepositoryInterface } from '@sdj/backend/radio/core/domain';
import { WsChannelStartedHandler } from './events/channel-started/ws-channel-started.handler';
import { WsChannelUpdatedHandler } from './events/channel-updated/ws-channel-updated.handler';
import { WsPlayQueuedTrackHandler } from './events/play-queued-track/ws-play-queued-track.handler';
import { WsPlaySilenceHandler } from './events/play-silence/ws-play-silence.handler';
import { WsPozdroHandler } from './events/pozdro/ws-pozdro.handler';
import { WsUserJoinedChannelHandler } from './events/user-joined-channel/ws-user-joined-channel.handler';
import { Gateway } from './gateway/gateway';

const EventsHandlers = [
  WsChannelStartedHandler,
  WsChannelUpdatedHandler,
  WsPlayQueuedTrackHandler,
  WsPlaySilenceHandler,
  WsPozdroHandler,
  WsUserJoinedChannelHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [...EventsHandlers, Gateway],
  exports: [Gateway],
})
export class WebSocketModule implements OnModuleInit {
  constructor(private channelRepository: ChannelRepositoryInterface) {}

  async onModuleInit(): Promise<void> {
    const channels = await this.channelRepository.findAll();
    for (const channel of channels) {
      channel.usersOnline = 0;
      channel.isRunning = false;
      this.channelRepository.save(channel);
    }
  }
}
