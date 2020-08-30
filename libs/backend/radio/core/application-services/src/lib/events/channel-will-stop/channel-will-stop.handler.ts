import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  ChannelDomainRepository,
  ChannelWillStopEvent
} from '@sdj/backend/radio/core/domain';
import { HostService } from '@sdj/backend/shared/application-services';

@EventsHandler(ChannelWillStopEvent)
export class ChannelWillStopHandler
  implements IEventHandler<ChannelWillStopEvent> {
  constructor(
    private channelRepository: ChannelDomainRepository,
    private hostService: HostService,
    private publisher: EventPublisher
  ) {}

  async handle(event: ChannelWillStopEvent): Promise<void> {
    await this.hostService.removeRadioStream(event.channelId);
    const channel = this.publisher.mergeObjectContext(
      await this.channelRepository.findOrFail(event.channelId)
    );
    channel.stop();
    await this.channelRepository.save(channel);
    channel.commit();
  }
}
