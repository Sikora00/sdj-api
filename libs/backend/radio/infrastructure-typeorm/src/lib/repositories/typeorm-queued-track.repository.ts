import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  QueuedTrack,
  QueuedTrackRepositoryInterface,
} from '@sdj/backend/radio/core/domain';
import { QueryBuilder, Repository } from 'typeorm';

@Injectable()
export class TypeormQueuedTrackRepository extends QueuedTrackRepositoryInterface {
  constructor(
    @InjectRepository(QueuedTrack)
    private typeOrmRepository: Repository<QueuedTrack>
  ) {
    super();
  }

  countTracksInQueueFromUser(
    userId: string,
    channelId: string
  ): Promise<number> {
    return this.typeOrmRepository
      .createQueryBuilder('queuedTrack')
      .where('queuedTrack.playedAt IS NULL')
      .andWhere('queuedTrack.addedById = :userId')
      .andWhere('queuedTrack.playedIn = :channelId')
      .setParameters({ userId })
      .setParameter('channelId', channelId)
      .getCount();
  }

  createQueryBuilder(alias: string): QueryBuilder<QueuedTrack> {
    return this.typeOrmRepository.createQueryBuilder(alias);
  }

  findOneOrFail(id: number): Promise<QueuedTrack> {
    return this.typeOrmRepository.findOneOrFail(id);
  }

  findQueuedTracks(channelId: string): Promise<QueuedTrack[]> {
    return this.typeOrmRepository
      .createQueryBuilder('queuedTrack')
      .where('queuedTrack.playedIn = :channelId')
      .leftJoinAndSelect('queuedTrack.track', 'track')
      .leftJoinAndSelect('queuedTrack.addedBy', 'user')
      .andWhere('queuedTrack.playedAt IS NULL')
      .orderBy('queuedTrack.order, queuedTrack.id', 'ASC')
      .setParameter('channelId', channelId)
      .getMany();
  }

  async getCurrentTrack(channelId: string): Promise<QueuedTrack | null> {
    return this.typeOrmRepository
      .createQueryBuilder('queuedTrack')
      .where('queuedTrack.playedIn = :channelId')
      .innerJoin(
        'queuedTrack.playedIn',
        'channel',
        'queuedTrack.id = channel.currentTrack'
      )
      .setParameter('channelId', channelId)
      .getOne();
  }

  getNextSongInQueue(channelId: string): Promise<QueuedTrack | undefined> {
    return this.typeOrmRepository
      .createQueryBuilder('queuedTrack')
      .where('queuedTrack.playedIn = :channelId')
      .leftJoinAndSelect('queuedTrack.track', 'track')
      .andWhere('queuedTrack.playedAt IS NULL')
      .orderBy('queuedTrack.order, queuedTrack.id', 'ASC')
      .setParameter('channelId', channelId)
      .getOne();
  }

  getQueue(channelId: string): Promise<QueuedTrack[]> {
    return this.typeOrmRepository
      .createQueryBuilder('queuedTrack')
      .where('queuedTrack.playedIn = :channelId')
      .innerJoinAndSelect('queuedTrack.track', 'track')
      .leftJoinAndSelect('queuedTrack.addedBy', 'addedBy  ')
      .andWhere('queuedTrack.playedAt IS NULL')
      .orderBy('queuedTrack.createdAt')
      .setParameter('channelId', channelId)
      .getMany();
  }

  remove(queuedTrack: QueuedTrack): Promise<QueuedTrack> {
    return this.typeOrmRepository.remove(queuedTrack);
  }

  save(queuedTrack: QueuedTrack): Promise<QueuedTrack> {
    return this.typeOrmRepository.save(queuedTrack);
  }
}
