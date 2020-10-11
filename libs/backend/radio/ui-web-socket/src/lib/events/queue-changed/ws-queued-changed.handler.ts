import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QueueChangedEvent } from '@sdj/backend/radio/core/domain';
import { WsQueueSynchronizationService } from '../../services/ws-queue-synchronization.service';

@EventsHandler(QueueChangedEvent)
export class WsQueuedChangedHandler
  implements IEventHandler<QueueChangedEvent> {
  constructor(
    private queueSynchronizationService: WsQueueSynchronizationService
  ) {}

  async handle(event: QueueChangedEvent): Promise<void> {
    return this.queueSynchronizationService.updateQueue(event.channelId);
  }
}
