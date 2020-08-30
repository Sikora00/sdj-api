import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs';
import { Track } from '../../entities/track.entity';

export abstract class TrackRepository {
  abstract loadMostPlayedTracks(
    channelId: string
  ): Observable<ApolloQueryResult<{ mostPlayedTracks: Track[] }>>;
}
