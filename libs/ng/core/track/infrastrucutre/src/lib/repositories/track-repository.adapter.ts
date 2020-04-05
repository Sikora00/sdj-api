import { Injectable } from '@angular/core';
import { Track } from '@sdj/ng/core/track/domain';
import { TrackRepository } from '@sdj/ng/core/track/domain-services';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable()
export class TrackRepositoryAdapter extends TrackRepository {
  constructor(private apollo: Apollo) {
    super();
  }

  loadMostPlayedTracks(
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
      `
    });
  }
}