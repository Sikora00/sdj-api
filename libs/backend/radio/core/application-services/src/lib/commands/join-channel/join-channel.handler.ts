import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ChannelDomainRepository } from '@sdj/backend/radio/core/domain';
import { JoinChannelCommand } from './join-channel.command';

@CommandHandler(JoinChannelCommand)
export class JoinChannelHandler implements ICommandHandler<JoinChannelCommand> {
  constructor(
    private channelRepository: ChannelDomainRepository,
    private publisher: EventPublisher
  ) {}

  async execute(command: JoinChannelCommand): Promise<void> {
    const channel = this.publisher.mergeObjectContext(
      await this.channelRepository.findOrCreate(command.channelId)
    );
    channel.join();
    await this.channelRepository.save(channel);
    channel.commit();
  }
}
