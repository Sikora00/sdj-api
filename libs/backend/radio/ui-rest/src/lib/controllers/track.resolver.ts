import { Args, Query, Resolver } from '@nestjs/graphql';
import { Track, TrackDomainRepository } from '@sdj/backend/radio/core/domain';

@Resolver(Track)
export class TrackResolver {
  constructor(private readonly trackRepository: TrackDomainRepository) {}

  @Query(returns => [Track])
  async mostPlayedTracks(
    @Args('channelId') channelId: string
  ): Promise<Track[]> {
    return this.trackRepository.findMostPlayedTracks(channelId);
  }
}
