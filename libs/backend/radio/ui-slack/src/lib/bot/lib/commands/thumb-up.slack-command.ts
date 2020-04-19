import { Injectable } from '@nestjs/common';
import {
  RadioFacade,
  ThumbUpCommand,
} from '@sdj/backend/radio/core/application-services';
import { QueuedTrackDomainRepository } from '@sdj/backend/radio/core/domain';
import {
  SlackCommand,
  SlackCommandHandler,
  SlackMessage,
  SlackService,
} from '@sikora00/nestjs-slack-bot';

@SlackCommandHandler()
@Injectable()
export class ThumbUpSlackCommand implements SlackCommand {
  description: string = ' the song will be played more often';
  type: string = ':+1:';

  constructor(
    private readonly radioFacade: RadioFacade,
    private slack: SlackService,
    private readonly queuedTrackRepository: QueuedTrackDomainRepository
  ) {}

  async handler(command: string[], message: SlackMessage): Promise<void> {
    await this.radioFacade.thumbUp(
      new ThumbUpCommand(message.channel, message.user)
    );
    const currentTrackInQueue = await this.queuedTrackRepository.getCurrentTrack(
      message.channel
    );

    await this.slack.sendMessage(
      'Super! (' + currentTrackInQueue.track.title + ') będzie grana częściej',
      message.channel
    );
  }
}
