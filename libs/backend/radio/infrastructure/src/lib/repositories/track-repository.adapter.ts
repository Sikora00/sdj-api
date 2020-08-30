import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track, TrackDomainRepository } from '@sdj/backend/radio/core/domain';
import { appConfig } from '@sdj/backend/shared/domain';
import { Brackets, Repository } from 'typeorm';

require('datejs');
const DateJS = <any>Date;

@Injectable()
export class TrackRepositoryAdapter extends TrackDomainRepository {
  constructor(
    @InjectRepository(Track)
    private typeOrmRepository: Repository<Track>
  ) {
    super();
  }
  countTracks(channelId: string): Promise<number> {
    return this.typeOrmRepository
      .createQueryBuilder('track')
      .innerJoin('track.queuedTracks', 'queuedTrack')
      .where('queuedTrack.playedIn = :channelId')
      .setParameter('channelId', channelId)
      .getCount();
  }

  findTopRatedTracks(
    channelId: string,
    index?: number,
    limit?: number
  ): Promise<Track[]> {
    const qb = this.typeOrmRepository
      .createQueryBuilder('track')
      .innerJoin('track.queuedTracks', 'queuedTrack')
      .leftJoin('queuedTrack.votes', 'vote')
      .where('vote.value > 0')
      .andWhere('queuedTrack.playedIn = :channelId')
      .groupBy('track.id')
      .setParameter('channelId', channelId)
      .orderBy('COUNT(track.id)', 'DESC');
    if (index) {
      qb.offset(index);
      qb.limit(limit || 1);
    }
    return qb.getMany();
  }

  findWeeklyTopRatedTracks(
    channelId: string,
    index?: number,
    limit?: number
  ): Promise<Track[]> {
    const qb = this.typeOrmRepository
      .createQueryBuilder('track')
      .innerJoin('track.queuedTracks', 'queuedTrack')
      .leftJoin('queuedTrack.votes', 'vote')
      .where('vote.value > 0')
      .andWhere('queuedTrack.playedIn = :channelId')
      .andWhere('queuedTrack.createdAt >= :weekAgo')
      .groupBy('track.id')
      .printSql()
      .orderBy('SUM(vote.value)', 'DESC')
      .setParameter('channelId', channelId)
      .setParameter(
        'weekAgo',
        DateJS.last()
          .week()
          .toString(appConfig.dbDateFormat)
      );
    if (index) {
      qb.offset(index);
      qb.limit(limit || 1);
    }

    return qb.getMany();
  }

  findMostPlayedTracks(
    channelId: string,
    index?: number,
    limit?: number
  ): Promise<Track[]> {
    const qb = this.typeOrmRepository
      .createQueryBuilder('track')
      .innerJoin('track.queuedTracks', 'queuedTrack')
      .where('queuedTrack.randomized = 0')
      .andWhere('queuedTrack.playedIn = :channelId')
      .groupBy('track.id')
      .setParameter('channelId', channelId)
      .orderBy('COUNT(track.id)', 'DESC');
    if (index) {
      qb.offset(index);
      qb.limit(limit || 1);
    }
    return qb.getMany();
  }

  findOne(trackId: string): Promise<Track> {
    return this.typeOrmRepository.findOne(trackId);
  }

  findOneOrFail(trackId: string): Promise<Track> {
    return this.typeOrmRepository.findOneOrFail(trackId);
  }

  findWeeklyMostPlayedTracks(
    channelId: string,
    index?: number,
    limit?: number
  ): Promise<Track[]> {
    const qb = this.typeOrmRepository
      .createQueryBuilder('track')
      .innerJoin('track.queuedTracks', 'queuedTrack')
      .where('queuedTrack.randomized = 0')
      .andWhere('queuedTrack.playedIn = :channelId')
      .andWhere('queuedTrack.createdAt >= :weekAgo')
      .groupBy('track.id')
      .orderBy('COUNT(track.id)', 'DESC')
      .setParameter('channelId', channelId)
      .setParameter(
        'weekAgo',
        DateJS.last()
          .week()
          .toString(appConfig.dbDateFormat)
      );
    if (index) {
      qb.offset(index);
      qb.limit(limit || 1);
    }
    return qb.getMany();
  }

  async getRandomTrack(channelId: string): Promise<Track> {
    const rawOne = await this.typeOrmRepository
      .createQueryBuilder('track')
      .select('DISTINCT track.id, vote.id as vId, vote.value')
      .orderBy('RAND()')
      .innerJoin('track.queuedTracks', 'queuedTrack')
      .leftJoin('queuedTrack.votes', 'vote')
      .where('track.skips < ' + appConfig.skipsToBan)
      .andWhere('queuedTrack.playedIn = :channelId')
      .andWhere(
        new Brackets(qb => {
          qb.where('vote.value > 0').orWhere('vote.value IS NULL');
        })
      )
      .setParameter('channelId', channelId)
      .getRawOne();

    if (rawOne) {
      return this.typeOrmRepository.findOneOrFail(rawOne.id);
    }
  }

  remove(track: Track): Promise<Track> {
    return this.typeOrmRepository.remove(track);
  }

  save(track: Track): Promise<Track> {
    return this.typeOrmRepository.save(track);
  }
}
