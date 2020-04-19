import { Injectable } from '@nestjs/common';
import {
  SlackCommand,
  SlackCommandHandler,
  SlackMessage,
  SlackService,
} from '@sikora00/nestjs-slack-bot';

@SlackCommandHandler()
@Injectable()
export class CleanShitSlackCommand implements SlackCommand {
  description: string =
    '`[żeton]` specjalnie dla Ciebie usunę wszystkie utwory w kolejce (żeton kosztuje 2zł)';
  type: string = 'cleanShit';

  constructor(private slack: SlackService) {}

  async handler(command: string[], message: SlackMessage): Promise<void> {
    this.slack.sendMessage(
      'Nie masz wystarczającej liczby żetonów.',
      message.channel
    );
  }
}
