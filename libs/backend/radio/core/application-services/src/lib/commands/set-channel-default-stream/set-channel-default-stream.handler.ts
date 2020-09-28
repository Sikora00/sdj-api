import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ChannelRepositoryInterface } from '@sdj/backend/radio/core/domain';
import { SetChannelDefaultStreamCommand } from './set-channel-default-stream.command';

@CommandHandler(SetChannelDefaultStreamCommand)
export class SetChannelDefaultStreamHandler
  implements ICommandHandler<SetChannelDefaultStreamCommand> {
  constructor(
    private channelRepository: ChannelRepositoryInterface,
    private publisher: EventPublisher
  ) {}

  async execute(command: SetChannelDefaultStreamCommand): Promise<void> {
    const channel = this.publisher.mergeObjectContext(
      await this.channelRepository.findOrCreate(command.channelId)
    );
    channel.setDefaultStream(command.streamUrl);
    await this.channelRepository.save(channel);
    channel.commit();
  }
}
