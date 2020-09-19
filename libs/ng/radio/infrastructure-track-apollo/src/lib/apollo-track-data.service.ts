import { Injectable } from '@angular/core';
import { TrackDataService } from '@sdj/ng/radio/core/application-services';
import { Track } from '@sdj/ng/radio/core/domain';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable()
export class ApolloTrackDataService extends TrackDataService {
  constructor(private apollo: Apollo) {
    super();
  }

  getMostPlayedTracks(
    channelId: string
  ): Observable<ApolloQueryResult<{ mostPlayedTracks: Track[] }>> {
    return this.apollo.query<{ mostPlayedTracks: Track[] }>({
      query: gql`
          {
              mostPlayedTracks(channelId: "${channelId}") {
                  title,
                  id,
                  playedCount
              }
          }
      `,
    });
  }
}
