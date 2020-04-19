import { Injectable } from '@nestjs/common';
import {
  RadioFacade,
  SetChannelDefaultStreamCommand,
} from '@sdj/backend/radio/core/application-services';
import {
  SlackCommand,
  SlackCommandHandler,
  SlackMessage,
  SlackService,
} from '@sikora00/nestjs-slack-bot';

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
    await this.slack.sendMessage('Zrobione!', message.channel);
  }

  private async validateCommand(
    command: string[],
    message: SlackMessage
  ): Promise<boolean> {
    if (command.length < 2) {
      await this.slack.sendMessage('Źle użyłeś komendy', message.channel);

      return false;
    }
    return true;
  }
}
