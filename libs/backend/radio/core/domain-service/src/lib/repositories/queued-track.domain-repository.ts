import { QueuedTrack } from '@sdj/backend/radio/core/domain';
import { QueryBuilder } from 'typeorm';

export abstract class QueuedTrackDomainRepository {
  abstract countTracksInQueueFromUser(
    userId: string,
    channelId: string
  ): Promise<number>;

  abstract findQueuedTracks(channelId: string): Promise<QueuedTrack[]>;

  abstract async getCurrentTrack(
    channelId: string
  ): Promise<QueuedTrack | undefined>;

  abstract getNextSongInQueue(
    channelId: string
  ): Promise<QueuedTrack | undefined>;

  abstract save(queuedTrack: QueuedTrack): Promise<QueuedTrack>;

  abstract async findOneOrFail(id: number): Promise<QueuedTrack>;

  // @TODO
  abstract createQueryBuilder(alias: string): QueryBuilder<QueuedTrack>;

  abstract remove(queuedTrack: QueuedTrack): Promise<QueuedTrack>;
}
