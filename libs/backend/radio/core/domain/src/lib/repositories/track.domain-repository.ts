import { Track } from '../entities/track.entity';

export abstract class TrackDomainRepository {
  abstract countTracks(channelId: string): Promise<number>;

  abstract findTopRatedTracks(
    channelId: string,
    index?: number,
    limit?: number
  ): Promise<Track[]>;

  abstract findWeeklyTopRatedTracks(
    channelId: string,
    index?: number,
    limit?: number
  ): Promise<Track[]>;

  abstract findMostPlayedTracks(
    channelId: string,
    index?: number,
    limit?: number
  ): Promise<Track[]>;

  abstract findWeeklyMostPlayedTracks(
    channelId: string,
    index?: number,
    limit?: number
  ): Promise<Track[]>;

  abstract async getRandomTrack(channelId: string): Promise<Track | undefined>;

  abstract save(track: Track): Promise<Track>;

  abstract async findOne(trackId: string): Promise<Track | undefined>;

  abstract async findOneOrFail(trackId: string): Promise<Track>;

  abstract async remove(track: Track): Promise<Track>;
}
