import { Injectable, Logger, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { User, UserDomainRepository } from '@sdj/backend/radio/core/domain';
import { SlackService } from '../../services/slack.service';
import { SlackCommand } from './interfaces/slack-command';

const commandsCollection: Type<SlackCommand>[] = [];

export function SlackCommandHandler(): (target: Type<SlackCommand>) => void {
  return (target: Type<SlackCommand>) => {
    commandsCollection.push(<Type<SlackCommand>>target);
  };
}

@Injectable()
export class Bot {
  private commands: { [key: string]: SlackCommand[] } = {};

  constructor(
    private readonly logger: Logger,
    private slack: SlackService,
    private userRepository: UserDomainRepository,
    private readonly moduleRef: ModuleRef
  ) {
    this.handleMessage = this.handleMessage.bind(this);
    this.init(...commandsCollection);
  }

  async init(...commands: Type<SlackCommand>[]): Promise<void> {
    const addCommand = this.addCommand.bind(this);
    const commandHandlers = await Promise.all(
      commands.map(type => this.moduleRef.create(type))
    );
    commandHandlers.forEach(addCommand);
    this.start();
  }

  addCommand(command: SlackCommand): void {
    let commands = this.commands[command.type];

    if (!commands) {
      commands = this.commands[command.type] = [];
    }

    commands.push(command);
  }

  getHelpMessage(user: string): string {
    let helpMsg = `Cześć <@${user}>! Łap listę poleceń!\n\n`;

    Object.keys(this.commands).forEach(key => {
      this.commands[key].forEach(command => {
        const typeEmiticon = command.type.startsWith(':');
        if (!typeEmiticon) {
          helpMsg += `\``;
        }

        helpMsg += `${command.type}`;
        if (!typeEmiticon) {
          helpMsg += `\``;
        }

        helpMsg += ` - ${command.description}\n`;
      });
    });

    return helpMsg;
  }

  handleMessage(message: any): void {
    if (
      !message.user ||
      message.type !== 'message' ||
      message.subtype === 'bot_message'
    ) {
      return;
    }

    this.userRepository.findOne(message.user).then(async (user: User) => {
      let userProfile: any;

      if (!user) {
        try {
          userProfile = await this.slack.web.users.info({
            user: message.user
          });
          userProfile = userProfile.user;

          if (!userProfile) {
            return;
          }
        } catch (e) {
          this.logger.error(e);
          return;
        }

        user = new User();
        user.id = message.user;
        user.name = userProfile.name;
        user.displayName = userProfile.profile.display_name;
        user.realName = userProfile.profile.real_name;
        user.image192 = userProfile.profile.image_192;
        user.image24 = userProfile.profile.image_24;
        user.image32 = userProfile.profile.image_32;
        user.image48 = userProfile.profile.image_48;
        user.image512 = userProfile.profile.image_512;
        user.image72 = userProfile.profile.image_72;

        await this.userRepository.save(user);
      }

      const command = message.text
        .split(/(\s+)/)
        .filter(e => e.trim().length > 0);
      const commands = this.commands[command[0]];

      if (command[0] === 'help') {
        this.slack.rtm.sendMessage(
          this.getHelpMessage(message.user),
          message.channel
        );
      }

      if (commands && commands.length) {
        commands.forEach(c => {
          c.handler(command, message).catch(e => {
            this.logger.log(e.message);
            this.sendErrorMessage(message.channel);
          });
        });
      } else {
        // this.slack.rtm.sendMessage(this.getHelpMessage(message.user), message.channel);
      }
    });
  }

  start(): void {
    this.slack.rtm.on('authenticated', rtmStartData => {
      this.logger.log(
        `Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}.`
      );
    });

    this.slack.rtm.on('message', this.handleMessage);
  }

  private sendErrorMessage(channel: string): void {
    this.slack.rtm.sendMessage('Ups! Coś poszło nie tak :(', channel);
  }
}
