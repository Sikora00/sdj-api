import {
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import {
  JoinChannelCommand,
  LeaveChannelCommand,
  RadioFacade,
  Store,
} from '@sdj/backend/radio/core/application-services';
import {
  ChannelRepositoryInterface,
  QueuedTrack,
} from '@sdj/backend/radio/core/domain';
import { HostService } from '@sdj/backend/shared/application-services';
import { WebSocketEvents } from '@sdj/shared/domain';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class Gateway implements OnGatewayDisconnect {
  private clientInRoomSubjects: { [key: string]: Subject<void> } = {};
  @WebSocketServer() server: Server;

  constructor(
    private readonly channelRepository: ChannelRepositoryInterface,
    private hostService: HostService,
    private readonly storageService: Store,
    private radioFacade: RadioFacade
  ) {}

  async handleDisconnect(client: Socket): Promise<void> {
    const channels = await this.channelRepository.findAll();
    for (const channel of channels) {
      if (
        (this.server.sockets.adapter.rooms[channel.id] &&
          this.server.sockets.adapter.rooms[channel.id].length <
            channel.usersOnline) ||
        (!this.server.sockets.adapter.rooms[channel.id] &&
          channel.usersOnline > 0)
      ) {
        this.radioFacade.leaveChannel(new LeaveChannelCommand(channel.id));
      }
    }
  }

  @SubscribeMessage(WebSocketEvents.join)
  async join(client: Socket, data: string): Promise<void> {
    const channelId = JSON.parse(data).room;
    if (!client.rooms[channelId]) {
      client.join(channelId);
      await this.radioFacade.joinChannel(new JoinChannelCommand(channelId));
      await this.leaveOtherChannels(client, channelId);
    }
  }

  @SubscribeMessage(WebSocketEvents.leaveChannel)
  async leaveChannel(client: Socket, channelId: string): Promise<void> {
    channelId = JSON.parse(channelId);
    client.leave(channelId);
    await this.radioFacade.leaveChannel(new LeaveChannelCommand(channelId));
  }

  @SubscribeMessage(WebSocketEvents.queuedTrackList)
  onQueuedTrackList(
    client: Socket,
    channel: string
  ): Observable<WsResponse<QueuedTrack[]>> {
    if (this.clientInRoomSubjects[client.id]) {
      this.clientInRoomSubjects[client.id].next();
      this.clientInRoomSubjects[client.id].complete();
    }
    this.clientInRoomSubjects[client.id] = new Subject();
    return this.storageService.getQueue(JSON.parse(channel)).pipe(
      takeUntil(this.clientInRoomSubjects[client.id]),
      map((list) => {
        return { event: WebSocketEvents.queuedTrackList, data: list };
      })
    );
  }

  private async leaveOtherChannels(
    client: Socket,
    channelId?: string
  ): Promise<void> {
    const otherChannelsIds = Object.keys(client.rooms).filter(
      (key: string) => key !== channelId
    );
    for (const otherChannelId of otherChannelsIds) {
      client.leave(otherChannelId);
      await this.radioFacade.leaveChannel(
        new LeaveChannelCommand(otherChannelId)
      );
    }
  }
}
