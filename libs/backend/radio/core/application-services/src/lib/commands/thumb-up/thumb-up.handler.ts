import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  QueuedTrackDomainRepository,
  User,
  UserDomainRepository,
  Vote,
  VoteDomainRepository,
} from '@sdj/backend/radio/core/domain';
import { ThumbUpCommand } from './thumb-up.command';

@CommandHandler(ThumbUpCommand)
export class ThumbUpHandler implements ICommandHandler<ThumbUpCommand> {
  constructor(
    private queuedTrackRepository: QueuedTrackDomainRepository,
    private userRepository: UserDomainRepository,
    private voteRepository: VoteDomainRepository
  ) {}

  async execute(command: ThumbUpCommand): Promise<void> {
    const userId = command.userId;
    const user = await this.userRepository.findOne(userId);
    const queuedTrack = await this.queuedTrackRepository.getCurrentTrack(
      command.channelId
    );

    if (!queuedTrack) {
      throw new Error('No track is playing');
    }

    const thumbUpFromUser = await this.voteRepository.countPositiveVotesFromUserToQueuedTrack(
      queuedTrack.id,
      userId
    );

    if (thumbUpFromUser > 0) {
      throw Error('To much thumbs');
    }

    const thumbUp = new Vote(<User>user, queuedTrack, 1);
    thumbUp.createdAt = new Date();
    await this.voteRepository.save(thumbUp);
    return;
  }
}
