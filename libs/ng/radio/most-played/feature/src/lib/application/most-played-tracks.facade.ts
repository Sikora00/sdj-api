import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TrackPartialState } from './+state/most-played-tracks.reducer';
import { mostPlayedTracksQuery } from './+state/most-played-tracks.selectors';
import { LoadMostPlayedTracksQuery } from './queries/load-most-played-tracks/load-most-played-tracks.query';

@Injectable()
export class MostPlayedTracksFacade {
  mostPlayedTracks$ = this.store.pipe(
    select(mostPlayedTracksQuery.mostPlayedTracks)
  );
  mostPlayedTracksLoading$ = this.store.pipe(
    select(mostPlayedTracksQuery.mostPlayedTracksLoading)
  );

  constructor(private store: Store<TrackPartialState>) {}

  loadMostPlayedTracks(channelId: string): void {
    this.store.dispatch(new LoadMostPlayedTracksQuery(channelId));
  }
}
