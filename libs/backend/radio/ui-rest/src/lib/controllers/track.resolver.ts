import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  Track,
  TrackRepositoryInterface,
} from '@sdj/backend/radio/core/domain';

@Resolver(Track)
export class TrackResolver {
  constructor(private readonly trackRepository: TrackRepositoryInterface) {}

  @Query((returns) => [Track])
  async mostPlayedTracks(
    @Args('channelId') channelId: string
  ): Promise<Track[]> {
    return this.trackRepository.findMostPlayedTracks(channelId);
  }

  @ResolveField('playedCount', () => Number)
  async getPlayedCount(@Parent() track: Track): Promise<number> {
    return track.playedCount();
  }
}
