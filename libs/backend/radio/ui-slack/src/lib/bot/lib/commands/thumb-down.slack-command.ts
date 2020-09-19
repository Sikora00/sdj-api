import { Injectable } from '@nestjs/common';
import {
  RadioFacade,
  ThumbDownCommand,
} from '@sdj/backend/radio/core/application-services';
import { SlackService } from '../../../services/slack.service';
import { SlackCommandHandler } from '../bot';
import { SlackCommand } from '../interfaces/slack-command';
import { SlackMessage } from '../interfaces/slack-message.interface';

@SlackCommandHandler()
@Injectable()
export class ThumbDownSlackCommand implements SlackCommand {
  description: string = 'Vote to skip that song';
  type: string = ':-1:';

  constructor(
    private slackService: SlackService,
    private readonly radioFacade: RadioFacade
  ) {}

  async handler(command: string[], message: SlackMessage): Promise<void> {
    const channelId = message.channel;

    await this.radioFacade.thumbDown(
      new ThumbDownCommand(channelId, message.user)
    );
  }
}
