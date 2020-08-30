import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QueuedTrackSkippedEvent } from '@sdj/backend/radio/core/application-services';
import { QueuedTrackDomainRepository } from '@sdj/backend/radio/core/domain';
import { SlackService } from '../../../../services/slack.service';

@EventsHandler(QueuedTrackSkippedEvent)
export class SlackQueuedTrackSkippedHandler
  implements IEventHandler<QueuedTrackSkippedEvent> {
  constructor(
    private queuedTrackRepository: QueuedTrackDomainRepository,
    private slackService: SlackService
  ) {}

  async handle(event: QueuedTrackSkippedEvent): Promise<unknown> {
    const queuedTrack = await this.queuedTrackRepository.findOneOrFail(
      event.queuedTrackId
    );
    return this.slackService.rtm.sendMessage(
      'Skipping ' +
        queuedTrack.track.title +
        '\n' +
        (queuedTrack.track.skips + 1) +
        ' times skipped',
      queuedTrack.playedIn.id
    );
  }
}
