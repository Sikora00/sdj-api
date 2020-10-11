import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

import { PozdroEvent, QueuedTrack } from '@sdj/backend/radio/core/domain';
import { AddTrackToQueueCommand } from './commands/add-track-to-queue/add-track-to-queue.command';
import { DeleteQueuedTrackCommand } from './commands/delete-queued-track/delete-queued-track.command';
import { DownloadAndPlayCommand } from './commands/download-and-play/download-and-play.command';
import { DownloadTrackCommand } from './commands/download-track/download-track.command';
import { FuckYouCommand } from './commands/fuck-you/fuck-you.command';
import { HeartCommand } from './commands/heart/heart.command';
import { JoinChannelCommand } from './commands/join-channel/join-channel.command';
import { LeaveChannelCommand } from './commands/leave-channel/leave-channel.command';
import { PlayNextTrackOrSilenceCommand } from './commands/play-next-track-or-silence/play-next-track-or-silence.command';
import { QueueTrackCommand } from './commands/queue-track/queue-track.command';
import { SetChannelDefaultStreamCommand } from './commands/set-channel-default-stream/set-channel-default-stream.command';
import { SkipQueuedTrackCommand } from './commands/skip-queued-track/skip-queued-track.command';
import { ThumbDownCommand } from './commands/thumb-down/thumb-down.command';
import { ThumbUpCommand } from './commands/thumb-up/thumb-up.command';
import { GetChannelsQuery } from './queries/get-channels/get-channels.query';
import { GetChannelsReadModel } from './queries/get-channels/get-channels.read-model';

@Injectable()
export class RadioFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private eventBus: EventBus,
    private readonly queryBus: QueryBus
  ) {}

  deleteQueuedTrack(command: DeleteQueuedTrackCommand): Promise<unknown> {
    return this.commandBus.execute(command);
  }

  downloadAndPlay(command: DownloadAndPlayCommand): Promise<unknown> {
    return this.commandBus.execute(command);
  }

  downloadTrack(command: DownloadTrackCommand): Promise<unknown> {
    return this.commandBus.execute(command);
  }

  fuckYou(command: FuckYouCommand): Promise<unknown> {
    return this.commandBus.execute(command);
  }

  getChannels(
    getChannelsQuery: GetChannelsQuery
  ): Promise<GetChannelsReadModel> {
    return this.queryBus.execute<GetChannelsQuery, GetChannelsReadModel>(
      getChannelsQuery
    );
  }

  getNextSong(command: PlayNextTrackOrSilenceCommand): Promise<unknown> {
    return this.commandBus.execute(command);
  }

  heart(command: HeartCommand): Promise<unknown> {
    return this.commandBus.execute(command);
  }

  joinChannel(command: JoinChannelCommand): Promise<void> {
    return this.commandBus.execute(command);
  }

  leaveChannel(leaveChannelCommand: LeaveChannelCommand): Promise<void> {
    return this.commandBus.execute(leaveChannelCommand);
  }

  playTrack(command: AddTrackToQueueCommand): Promise<unknown> {
    return this.commandBus.execute(command);
  }

  pozdro(event: PozdroEvent): void {
    return this.eventBus.publish(event);
  }

  queueTrack(command: QueueTrackCommand): Promise<QueuedTrack> {
    return this.commandBus.execute(command);
  }

  setChannelDefaultStream(
    command: SetChannelDefaultStreamCommand
  ): Promise<void> {
    return this.commandBus.execute(command);
  }

  skipQueuedTrack(command: SkipQueuedTrackCommand): Promise<unknown> {
    return this.commandBus.execute(command);
  }

  thumbDown(command: ThumbDownCommand): Promise<unknown> {
    return this.commandBus.execute(command);
  }

  thumbUp(command: ThumbUpCommand): Promise<unknown> {
    return this.commandBus.execute(command);
  }
}
