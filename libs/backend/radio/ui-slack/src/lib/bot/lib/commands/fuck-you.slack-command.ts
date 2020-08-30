import { Injectable } from '@nestjs/common';
import {
  FuckYouCommand,
  RadioFacade
} from '@sdj/backend/radio/core/application-services';
import { QueuedTrackDomainRepository } from '@sdj/backend/radio/core/domain';
import { SlackService } from '../../../services/slack.service';
import { SlackCommandHandler } from '../bot';
import { SlackCommand } from '../interfaces/slack-command';
import { SlackMessage } from '../interfaces/slack-message.interface';

@SlackCommandHandler()
@Injectable()
export class FuckYouSlackCommand implements SlackCommand {
  description: string =
    '`-3` do rankingu dla aktualnie granej piosenki (raz dziennie)';
  type: string = ':middle_finger:';

  constructor(
    private readonly cqrsServiceFacade: RadioFacade,
    private readonly queuedTrackRepository: QueuedTrackDomainRepository,
    private readonly slackService: SlackService
  ) {}

  async handler(command: string[], message: SlackMessage): Promise<void> {
    try {
      await this.cqrsServiceFacade.fuckYou(
        new FuckYouCommand(message.channel, message.user)
      );
      const currentTrackInQueue = await this.queuedTrackRepository.getCurrentTrack(
        message.channel
      );
      this.slackService.rtm.sendMessage(
        'Jebać ' + currentTrackInQueue.track.title,
        message.channel
      );
    } catch (e) {
      //TODO more specific error handling
      this.slackService.rtm.sendMessage(
        'Wyraziłeś już dość swojej nienawiści na dziś ',
        message.channel
      );
    }
  }
}
