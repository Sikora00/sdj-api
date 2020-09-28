import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { QueuedTrackSkippedEvent } from '@sdj/backend/radio/core/application-services';
import { QueuedTrackRepositoryInterface } from '@sdj/backend/radio/core/domain';
import { SlackService } from '@sikora00/nestjs-slack-bot';

@EventsHandler(QueuedTrackSkippedEvent)
export class SlackQueuedTrackSkippedHandler
  implements IEventHandler<QueuedTrackSkippedEvent> {
  constructor(
    private queuedTrackRepository: QueuedTrackRepositoryInterface,
    private slackService: SlackService
  ) {}

  async handle(event: QueuedTrackSkippedEvent): Promise<unknown> {
    const queuedTrack = await this.queuedTrackRepository.findOneOrFail(
      event.queuedTrackId
    );
    return this.slackService.sendMessage(
      'Skipping ' +
        queuedTrack.track.title +
        '\n' +
        (queuedTrack.track.skips + 1) +
        ' times skipped',
      queuedTrack.playedIn.id
    );
  }
}
