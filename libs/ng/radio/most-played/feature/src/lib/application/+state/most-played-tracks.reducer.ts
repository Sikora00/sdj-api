import { Action } from '@ngrx/store';
import { MostPlayedTracksReceivedEvent } from '../events/most-played-tracks-received.event';
import { LoadMostPlayedTracksQuery } from '../queries/load-most-played-tracks/load-most-played-tracks.query';

export const MOST_PLAYED_TRACKS_FEATURE_KEY = 'mostPlayedTracks';

export interface MostPlayedTracksState {
  mostPlayedTracksIds: string[] | null;
  mostPlayedTracksLoading: boolean;
}

export interface TrackPartialState {
  readonly [MOST_PLAYED_TRACKS_FEATURE_KEY]: MostPlayedTracksState;
}

export const initialState: MostPlayedTracksState = {
  mostPlayedTracksIds: [],
  mostPlayedTracksLoading: false,
};

export function reducer(
  state: MostPlayedTracksState = initialState,
  action: Action
): MostPlayedTracksState {
  switch (action.type) {
    case MostPlayedTracksReceivedEvent.type:
      state = {
        ...state,
        mostPlayedTracksIds: (<MostPlayedTracksReceivedEvent>action).trackIds,
        mostPlayedTracksLoading: false,
      };
      break;
    case LoadMostPlayedTracksQuery.type:
      state = {
        ...state,
        mostPlayedTracksIds: [],
        mostPlayedTracksLoading: true,
      };
  }
  return state;
}
