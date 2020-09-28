import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  QueuedTrackRepositoryInterface,
  VoteRepositoryInterface,
} from '@sdj/backend/radio/core/domain';
import { appConfig } from '@sdj/backend/shared/domain';
import { SkipQueuedTrackCommand } from '../../commands/skip-queued-track/skip-queued-track.command';
import { RadioFacade } from '../../radio.facade';
import { SongVotedNegativelyEvent } from './song-voted-negatively.event';

@EventsHandler(SongVotedNegativelyEvent)
export class SongVotedNegativelyHandler
  implements IEventHandler<SongVotedNegativelyEvent> {
  constructor(
    private queuedTrackRepository: QueuedTrackRepositoryInterface,
    private radioFacade: RadioFacade,
    private voteRepository: VoteRepositoryInterface
  ) {}

  async handle(event: SongVotedNegativelyEvent): Promise<unknown> {
    const queuedTrack = await this.queuedTrackRepository.findOneOrFail(
      event.queuedTrackId
    );
    const unlikesCount = await this.voteRepository.countUnlinksForQueuedTrack(
      queuedTrack.id
    );

    if (unlikesCount + 1 >= appConfig.nextSongVoteQuantity) {
      return this.radioFacade.skipQueuedTrack(
        new SkipQueuedTrackCommand(queuedTrack.id)
      );
    }
  }
}
