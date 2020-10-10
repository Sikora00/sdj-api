import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectEntities, State, trackFeatureKey } from './track.reducer';

const getTrackState = createFeatureSelector<State>(trackFeatureKey);

const getTrackEntities = createSelector(getTrackState, selectEntities);

export const trackQuery = {
  getTrackEntities,
};
