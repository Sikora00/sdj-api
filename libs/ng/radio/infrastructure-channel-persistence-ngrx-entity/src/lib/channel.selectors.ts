import { createFeatureSelector, createSelector } from '@ngrx/store';
import { channelsFeatureKey, selectEntities, State } from './channel.reducer';

const getChannelState = createFeatureSelector<State>(channelsFeatureKey);

const getChannelEntities = createSelector(getChannelState, selectEntities);

export const channelQuery = {
  getChannelEntities,
};
