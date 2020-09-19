import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PlayTrackHandler } from './commands/add-track-to-queue/add-track-to-queue.hander';
import { CreateTrackHandler } from './commands/create-track/create-track.handler';
import { DeleteQueuedTrackHandler } from './commands/delete-queued-track/delete-queued-track.handler';
import { DeleteTrackHandler } from './commands/delete-track/delete-track.handler';
import { DownloadAndPlayHandler } from './commands/download-and-play/download-and-play.handler';
import { DownloadTrackHandler } from './commands/download-track/download-track.handler';
import { FuckYouHandler } from './commands/fuck-you/fuck-you.handler';
import { HeartHandler } from './commands/heart/heart.handler';
import { JoinChannelHandler } from './commands/join-channel/join-channel.handler';
import { LeaveChannelHandler } from './commands/leave-channel/leave-channel.handler';
import { PlayNextTrackOrSilenceHandler } from './commands/play-next-track-or-silence/play-next-track-or-silence.handler';
import { QueueTrackHandler } from './commands/queue-track/queue-track.handler';
import { SetChannelDefaultStreamHandler } from './commands/set-channel-default-stream/set-channel-default-stream.handler';
import { SkipQueuedTrackHandler } from './commands/skip-queued-track/skip-queued-track.handler';
import { ThumbDownHandler } from './commands/thumb-down/thumb-down.handler';
import { ThumbUpHandler } from './commands/thumb-up/thumb-up.handler';
import { ChannelWillStartHandler } from './events/channel-will-start/channel-will-start.handler';
import { ChannelWillStopHandler } from './events/channel-will-stop/channel-will-stop.handler';
import { PlayQueuedTrackHandler } from './events/play-queued-track/play-queued-track.handler';
import { PlaySilenceHandler } from './events/play-silence/play-silence.handler';
import { SongVotedNegativelyHandler } from './events/song-voted-negatively/song-voted-negatively.handler';
import { GetChannelsHandler } from './queries/get-channels/get-channels.handler';
import { RadioFacade } from './radio.facade';

export const CommandHandlers = [
  CreateTrackHandler,
  DeleteQueuedTrackHandler,
  DeleteTrackHandler,
  DownloadAndPlayHandler,
  DownloadTrackHandler,
  FuckYouHandler,
  HeartHandler,
  JoinChannelHandler,
  LeaveChannelHandler,
  PlayNextTrackOrSilenceHandler,
  PlayTrackHandler,
  SetChannelDefaultStreamHandler,
  SkipQueuedTrackHandler,
  QueueTrackHandler,
  ThumbDownHandler,
  ThumbUpHandler,
];

export const EventHandlers = [
  ChannelWillStartHandler,
  ChannelWillStopHandler,
  PlayQueuedTrackHandler,
  PlaySilenceHandler,
  SongVotedNegativelyHandler,
];

const QueryHandlers = [GetChannelsHandler];

@Module({
  imports: [CqrsModule],
  providers: [
    RadioFacade,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
  exports: [RadioFacade],
})
export class BackendRadioCoreApplicationServicesModule {}
