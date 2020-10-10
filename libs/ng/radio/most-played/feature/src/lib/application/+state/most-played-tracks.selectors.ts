import { createFeatureSelector, createSelector } from '@ngrx/store';
import { trackQuery } from '@sdj/ng/radio/infrastructure-track-persistence-ngrx-entity';
import {
  MOST_PLAYED_TRACKS_FEATURE_KEY,
  MostPlayedTracksState,
} from './most-played-tracks.reducer';

const getTrackState = createFeatureSelector<MostPlayedTracksState>(
  MOST_PLAYED_TRACKS_FEATURE_KEY
);

const mostPlayedTracks = createSelector(
  getTrackState,
  trackQuery.getTrackEntities,
  (state, entities) => state.mostPlayedTracksIds.map((id) => entities[id])
);

const mostPlayedTracksLoading = createSelector(
  getTrackState,
  (state) => state.mostPlayedTracksLoading
);

export const mostPlayedTracksQuery = {
  mostPlayedTracks,
  mostPlayedTracksLoading,
};
