import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  QueuedTrackRepositoryInterface,
  User,
  UserRepositoryInterface,
  Vote,
  VoteRepositoryInterface,
} from '@sdj/backend/radio/core/domain';
import { HeartCommand } from './heart.command';

@CommandHandler(HeartCommand)
export class HeartHandler implements ICommandHandler<HeartCommand> {
  constructor(
    private queuedTrackRepository: QueuedTrackRepositoryInterface,
    private userRepository: UserRepositoryInterface,
    private voteRepository: VoteRepositoryInterface
  ) {}

  async execute(command: HeartCommand): Promise<void> {
    const userId = command.userId;
    const user = await this.userRepository.findOne(userId);
    const queuedTrack = await this.queuedTrackRepository.getCurrentTrack(
      command.channelId
    );
    if (!queuedTrack) {
      throw Error('No track is playing');
    }
    const heartsFromUser = await this.voteRepository.countTodayHeartsFromUser(
      userId,
      queuedTrack.playedIn.id
    );

    if (heartsFromUser > 0) {
      throw Error('To much hearts');
    }

    const thumbUp = new Vote(<User>user, queuedTrack, 3);
    thumbUp.createdAt = new Date();
    await this.voteRepository.save(thumbUp);
  }
}
