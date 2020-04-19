import { Module } from '@nestjs/common';
import { connectionConfig } from '@sdj/backend/shared/domain';
import { SlackBotModule } from '@sikora00/nestjs-slack-bot';
import { CleanShitSlackCommand } from './bot/lib/commands/clean-shit.slack-command';
import { FuckYouSlackCommand } from './bot/lib/commands/fuck-you.slack-command';
import { HeartSlackCommand } from './bot/lib/commands/heart.slack-command';
import { LsSlackCommand } from './bot/lib/commands/ls.slack-command';
import { PlayTrackSlackCommand } from './bot/lib/commands/play-track.slack-command';
import { PozdroSlackCommand } from './bot/lib/commands/pozdro.slack-command';
import { RandSlackCommand } from './bot/lib/commands/rand.slack-command';
import { RefreshSlackCommand } from './bot/lib/commands/refresh.slack-command';
import { SetChannelDefaultStreamSlackCommand } from './bot/lib/commands/set-channel-default-stream.slack-command';
import { ThumbDownSlackCommand } from './bot/lib/commands/thumb-down.slack-command';
import { ThumbUpSlackCommand } from './bot/lib/commands/thumb-up.slack-command';
import { SlackQueuedTrackSkippedHandler } from './bot/lib/events/queued-track-skipped/slack-queued-track-skipped.handler';

const EventsHandlers = [SlackQueuedTrackSkippedHandler];

@Module({
  imports: [
    SlackBotModule.forRoot({ slackToken: connectionConfig.slack.token }),
  ],
  providers: [
    CleanShitSlackCommand,
    FuckYouSlackCommand,
    LsSlackCommand,
    HeartSlackCommand,
    PlayTrackSlackCommand,
    PozdroSlackCommand,
    RandSlackCommand,
    RefreshSlackCommand,
    SetChannelDefaultStreamSlackCommand,
    ThumbUpSlackCommand,
    ThumbDownSlackCommand,
    ...EventsHandlers,
  ],
})
export class SlackModule {}
