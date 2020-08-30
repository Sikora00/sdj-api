import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TRACK_FEATURE_KEY, TrackState } from './track.reducer';

const getTrackState = createFeatureSelector<TrackState>(TRACK_FEATURE_KEY);

const mostPlayedTracks = createSelector(
  getTrackState,
  state => state.mostPlayedTracks
);

const mostPlayedTracksLoading = createSelector(
  getTrackState,
  state => state.mostPlayedTracksLoading
);

export const trackQuery = {
  mostPlayedTracks,
  mostPlayedTracksLoading
};
