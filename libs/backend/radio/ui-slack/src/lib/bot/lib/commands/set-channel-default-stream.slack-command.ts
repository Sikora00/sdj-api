import { Injectable } from '@nestjs/common';
import {
  RadioFacade,
  SetChannelDefaultStreamCommand,
} from '@sdj/backend/radio/core/application-services';
import { SlackService } from '../../../services/slack.service';
import { SlackCommandHandler } from '../bot';
import { SlackCommand } from '../interfaces/slack-command';
import { SlackMessage } from '../interfaces/slack-message.interface';

@SlackCommandHandler()
@Injectable()
export class SetChannelDefaultStreamSlackCommand implements SlackCommand {
  description: string =
    '`[streamUrl]` -  set default stream url which will be played when queue is empty';
  type: string = 'stream';

  constructor(private radioFacade: RadioFacade, private slack: SlackService) {}

  async handler(command: string[], message: SlackMessage): Promise<void> {
    if (!this.validateCommand(command, message)) {
      return;
    }
    const streamUrl = command[1].replace('<', '').replace('>', '');

    await this.radioFacade.setChannelDefaultStream(
      new SetChannelDefaultStreamCommand(message.channel, streamUrl)
    );
    await this.slack.rtm.sendMessage('Zrobione!', message.channel);
  }

  private async validateCommand(
    command: string[],
    message: SlackMessage
  ): Promise<boolean> {
    if (command.length < 2) {
      await this.slack.rtm.sendMessage('Źle użyłeś komendy', message.channel);

      return false;
    }
    return true;
  }
}
