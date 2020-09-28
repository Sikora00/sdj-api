import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote, VoteRepositoryInterface } from '@sdj/backend/radio/core/domain';
import { appConfig } from '@sdj/backend/shared/domain';
import { Repository } from 'typeorm';

require('datejs');
const DateJS = <any>Date;

@Injectable()
export class TypeormVoteRepository extends VoteRepositoryInterface {
  constructor(
    @InjectRepository(Vote) private typeOrmRepository: Repository<Vote>
  ) {
    super();
  }
  countTodayHeartsFromUser(userId: string, channelId: string): Promise<number> {
    return this.typeOrmRepository
      .createQueryBuilder('vote')
      .where('vote.addedBy.id = :userId')
      .andWhere('vote.addedIn = :channelId')
      .andWhere('vote.value = 3')
      .andWhere('vote.createdAt > :today')
      .setParameter('channelId', channelId)
      .setParameter('today', DateJS.today().toString(appConfig.dbDateFormat))
      .setParameter('userId', userId)
      .getCount();
  }

  countTodayFucksFromUser(userId: string, channelId: string): Promise<number> {
    return this.typeOrmRepository
      .createQueryBuilder('vote')
      .where('vote.addedBy.id = :userId')
      .andWhere('vote.addedIn = :channelId')
      .andWhere('vote.value = :value')
      .andWhere('vote.createdAt > :today')
      .setParameter('channelId', channelId)
      .setParameter('today', DateJS.today().toString(appConfig.dbDateFormat))
      .setParameter('userId', userId)
      .setParameter('value', -3)
      .getCount();
  }

  countPositiveVotesFromUserToQueuedTrack(
    queuedTrackId: number,
    userId: string
  ): Promise<number> {
    return this.typeOrmRepository
      .createQueryBuilder('vote')
      .where('vote.addedBy.id = :userId')
      .andWhere('vote.value > 0')
      .setParameter('userId', userId)
      .andWhere('vote.track.id = :trackId')
      .setParameter('trackId', queuedTrackId)
      .getCount();
  }

  countUnlikesFromUserToQueuedTrack(
    queuedTrackId: number,
    userId: string
  ): Promise<number> {
    return this.typeOrmRepository
      .createQueryBuilder('vote')
      .where('vote.addedBy.id = :userId')
      .andWhere('vote.value < 0')
      .setParameter('userId', userId)
      .andWhere('vote.track.id = :trackId')
      .setParameter('trackId', queuedTrackId)
      .getCount();
  }

  countUnlinksForQueuedTrack(queuedTrackId: number): Promise<number> {
    return this.typeOrmRepository
      .createQueryBuilder('unlike')
      .where('unlike.value < 0')
      .andWhere('unlike.track.id = :trackId')
      .setParameter('trackId', queuedTrackId)
      .getCount();
  }

  remove(vote: Vote): Promise<Vote> {
    return this.typeOrmRepository.remove(vote);
  }

  save(vote: Vote): Promise<Vote> {
    return this.typeOrmRepository.save(vote);
  }
}
