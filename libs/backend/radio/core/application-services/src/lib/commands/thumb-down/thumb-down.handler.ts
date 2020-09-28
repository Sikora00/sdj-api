import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import {
  QueuedTrackRepositoryInterface,
  User,
  UserRepositoryInterface,
  Vote,
  VoteRepositoryInterface,
} from '@sdj/backend/radio/core/domain';
import { SongVotedNegativelyEvent } from '../../events/song-voted-negatively/song-voted-negatively.event';
import { ThumbDownCommand } from './thumb-down.command';

@CommandHandler(ThumbDownCommand)
export class ThumbDownHandler implements ICommandHandler<ThumbDownCommand> {
  constructor(
    private eventBus: EventBus,
    private queuedTrackRepository: QueuedTrackRepositoryInterface,
    private userRepository: UserRepositoryInterface,
    private voteRepository: VoteRepositoryInterface
  ) {}

  async execute(command: ThumbDownCommand): Promise<void> {
    const { channelId, userId } = command;
    const user = await this.userRepository.findOne(userId);
    const queuedTrack = await this.queuedTrackRepository.getCurrentTrack(
      channelId
    );

    if (!queuedTrack) {
      throw Error('No track is playing');
    }

    const unlikesCountFromUser = await this.voteRepository.countUnlikesFromUserToQueuedTrack(
      queuedTrack.id,
      userId,
      channelId
    );

    if (unlikesCountFromUser > 0) {
      throw Error('To many votes');
    }

    // ToDo move to command
    const unlike = new Vote(<User>user, queuedTrack, -1);
    unlike.createdAt = new Date();
    await this.voteRepository.save(unlike);
    this.eventBus.publish(new SongVotedNegativelyEvent(queuedTrack.id));
  }
}
