import { Vote } from '../entities/vote.entity';

export abstract class VoteRepositoryInterface {
  abstract countTodayHeartsFromUser(
    userId: string,
    channelId: string
  ): Promise<number>;

  abstract countTodayFucksFromUser(
    userId: string,
    channelId: string
  ): Promise<number>;

  abstract countPositiveVotesFromUserToQueuedTrack(
    queuedTrackId: number,
    userId: string
  ): Promise<number>;
  abstract countUnlikesFromUserToQueuedTrack(
    queuedTrackId: number,
    userId: string,
    channelId: string
  ): Promise<number>;
  abstract countUnlinksForQueuedTrack(queuedTrackId: number): Promise<number>;

  abstract async save(vote: Vote): Promise<Vote>;

  abstract async remove(vote: Vote): Promise<Vote>;
}
