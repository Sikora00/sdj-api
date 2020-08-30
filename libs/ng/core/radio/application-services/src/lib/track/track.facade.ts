import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TrackPartialState } from './+state/track.reducer';
import { trackQuery } from './+state/track.selectors';
import { LoadMostPlayedTracksQuery } from './queries/load-most-played-tracks/load-most-played-tracks.query';

@Injectable()
export class TrackFacade {
  mostPlayedTracks$ = this.store.pipe(select(trackQuery.mostPlayedTracks));
  mostPlayedTracksLoading$ = this.store.pipe(
    select(trackQuery.mostPlayedTracksLoading)
  );

  constructor(private store: Store<TrackPartialState>) {}

  loadMostPlayedTracks(channelId: string): void {
    this.store.dispatch(new LoadMostPlayedTracksQuery(channelId));
  }
}
