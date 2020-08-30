import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  QueuedTrack,
  QueuedTrackDomainRepository,
  Track,
  TrackDomainRepository,
  VoteDomainRepository
} from '@sdj/backend/radio/core/domain';
import { DeleteTrackCommand } from './delete-track.command';

@CommandHandler(DeleteTrackCommand)
export class DeleteTrackHandler implements ICommandHandler<DeleteTrackCommand> {
  constructor(
    private readonly queuedTrackRepository: QueuedTrackDomainRepository,
    private readonly trackRepository: TrackDomainRepository,
    private readonly voteRepository: VoteDomainRepository
  ) {}

  async execute(command: DeleteTrackCommand): Promise<void> {
    // TODO CASCADE DELETE
    const track = await this.trackRepository.findOneOrFail(command.trackId);
    this.removeQueuedTrackOfTrack(track);
    await this.trackRepository.remove(track);
  }

  // ToDo Optimize for Node
  async removeQueuedTrackOfTrack(track: Track): Promise<void> {
    for (const qTrack of await track.queuedTracks) {
      this.removeVotesForQueuedTrack(qTrack);
      await this.queuedTrackRepository.remove(qTrack);
    }
  }

  async removeVotesForQueuedTrack(queuedTrack: QueuedTrack): Promise<void> {
    for (const vote of await queuedTrack.votes) {
      await this.voteRepository.remove(vote);
    }
  }
}
