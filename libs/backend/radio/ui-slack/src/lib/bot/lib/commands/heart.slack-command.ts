import { Injectable } from '@nestjs/common';
import {
  HeartCommand,
  RadioFacade,
} from '@sdj/backend/radio/core/application-services';
import { QueuedTrackDomainRepository } from '@sdj/backend/radio/core/domain';
import { SlackService } from '../../../services/slack.service';
import { SlackCommandHandler } from '../bot';
import { SlackCommand } from '../interfaces/slack-command';
import { SlackMessage } from '../interfaces/slack-message.interface';

@SlackCommandHandler()
@Injectable()
export class HeartSlackCommand implements SlackCommand {
  description: string =
    '`+3` do rankingu dla aktualnie granej piosenki (raz dziennie)';
  type: string = ':heart:';

  constructor(
    private readonly queuedTrackRepository: QueuedTrackDomainRepository,
    private readonly radioFacade: RadioFacade,
    private readonly slackService: SlackService
  ) {}

  async handler(command: string[], message: SlackMessage): Promise<void> {
    try {
      await this.radioFacade.heart(
        new HeartCommand(message.channel, message.user)
      );
      const currentTrackInQueue = await this.queuedTrackRepository.getCurrentTrack(
        message.channel
      );
      this.slackService.rtm.sendMessage(
        ':heart: ' + currentTrackInQueue.track.title,
        message.channel
      );
    } catch (e) {
      this.slackService.rtm.sendMessage('Co ty pedał jesteś?', message.channel);
    }
  }
}
