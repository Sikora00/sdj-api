import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ChannelDomainRepository } from '@sdj/backend/radio/core/domain';
import { LeaveChannelCommand } from './leave-channel.command';

@CommandHandler(LeaveChannelCommand)
export class LeaveChannelHandler
  implements ICommandHandler<LeaveChannelCommand> {
  constructor(
    private channelRepository: ChannelDomainRepository,
    private publisher: EventPublisher
  ) {}

  async execute(command: LeaveChannelCommand): Promise<void> {
    let channel = await this.channelRepository.findOrFail(command.channelId);
    if (channel) {
      channel = this.publisher.mergeObjectContext(channel);
      channel.leave();
      await this.channelRepository.save(channel);
      channel.commit();
    }
  }
}
