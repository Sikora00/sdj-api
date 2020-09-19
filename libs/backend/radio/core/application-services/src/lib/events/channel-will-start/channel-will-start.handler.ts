import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  ChannelDomainRepository,
  ChannelWillStartEvent,
} from '@sdj/backend/radio/core/domain';
import { HostService } from '@sdj/backend/shared/application-services';

@EventsHandler(ChannelWillStartEvent)
export class ChannelWillStartHandler
  implements IEventHandler<ChannelWillStartEvent> {
  constructor(
    private channelRepository: ChannelDomainRepository,
    private hostService: HostService,
    private publisher: EventPublisher
  ) {}

  async handle(event: ChannelWillStartEvent): Promise<void> {
    await this.hostService.startRadioStream(event.channelId);
    const channel = this.publisher.mergeObjectContext(
      await this.channelRepository.findOrFail(event.channelId)
    );
    channel.start();
    await this.channelRepository.save(channel);
    channel.commit();
  }
}
