import { Injectable } from '@nestjs/common';
import { RadioFacade } from '@sdj/backend/radio/core/application-services';
import { UserDomainRepository } from '@sdj/backend/radio/core/domain-service';
import { LoggerService } from '@sdj/backend/shared/logger';
import { PozdroEvent } from '../../../../../../core/application-services/src/lib/events/pozdro/pozdro.event';
import { SlackCommandHandler } from '../bot';
import { SlackCommand } from '../interfaces/slack-command';
import { SlackMessage } from '../interfaces/slack-message.interface';

@SlackCommandHandler()
@Injectable()
export class PozdroSlackCommand implements SlackCommand {
  description: string =
    'wyślij pozdro swoim ziomeczkom (może też być dla mamy)';
  type: string = 'pozdro';

  constructor(
    private readonly logger: LoggerService,
    private radioFacade: RadioFacade,
    private userRepository: UserDomainRepository
  ) {}

  async handler(command: string[], message: SlackMessage): Promise<void> {
    command.shift();
    const pozdro = command.join(' ');

    if (pozdro.length > 200) {
      throw new Error('too long');
    }

    const user = await this.userRepository.findOne(message.user);

    if (user) {
      this.logger.verbose(user.realName + ' mowi: ' + pozdro);
      this.radioFacade.pozdro(new PozdroEvent(message.channel, pozdro));
    }
  }
}
