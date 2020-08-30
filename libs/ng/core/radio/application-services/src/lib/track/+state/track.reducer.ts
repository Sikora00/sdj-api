import { Action } from '@ngrx/store';
import { MostPlayedTracksReceivedEvent } from '../events/most-played-tracks-received.event';
import { LoadMostPlayedTracksQuery } from '../queries/load-most-played-tracks/load-most-played-tracks.query';
import { Track } from '@sdj/ng/core/radio/domain';

export const TRACK_FEATURE_KEY = 'track';

export interface TrackState {
  mostPlayedTracks: Track[] | null;
  mostPlayedTracksLoading: boolean;
}

export interface TrackPartialState {
  readonly [TRACK_FEATURE_KEY]: TrackState;
}

export const initialState: TrackState = {
  mostPlayedTracks: null,
  mostPlayedTracksLoading: false
};

export function reducer(
  state: TrackState = initialState,
  action: Action
): TrackState {
  switch (action.type) {
    case MostPlayedTracksReceivedEvent.type:
      state = {
        ...state,
        mostPlayedTracks: (<MostPlayedTracksReceivedEvent>action).tracks,
        mostPlayedTracksLoading: false
      };
      break;
    case LoadMostPlayedTracksQuery.type:
      state = {
        ...state,
        mostPlayedTracks: null,
        mostPlayedTracksLoading: true
      };
  }
  return state;
}
