import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  QueuedTrackDomainRepository,
  User,
  UserDomainRepository,
  Vote,
  VoteDomainRepository
} from '@sdj/backend/radio/core/domain';
import { FuckYouCommand } from './fuck-you.command';

@CommandHandler(FuckYouCommand)
export class FuckYouHandler implements ICommandHandler<FuckYouCommand> {
  constructor(
    private queuedTrackRepository: QueuedTrackDomainRepository,
    private userRepository: UserDomainRepository,
    private voteRepository: VoteDomainRepository
  ) {}

  async execute(command: FuckYouCommand): Promise<void> {
    const userId = command.userId;
    const user = await this.userRepository.findOne(userId);
    const queuedTrack = await this.queuedTrackRepository.getCurrentTrack(
      command.channelId
    );
    if (!queuedTrack) {
      throw new Error('No track is playing');
    }
    const fucksFromUser = await this.voteRepository.countTodayFucksFromUser(
      userId,
      queuedTrack.playedIn.id
    );

    if (fucksFromUser > 0) {
      throw Error('To much Fucks');
    }

    const thumbUp = new Vote(<User>user, queuedTrack, -3);
    thumbUp.createdAt = new Date();
    await this.voteRepository.save(thumbUp);
  }
}
