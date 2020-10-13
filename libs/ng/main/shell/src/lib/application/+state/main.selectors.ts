import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MAIN_FEATURE_KEY, MainState } from './main.reducer';
import { channelQuery } from '@sdj/ng/radio/infrastructure-channel-persistence-ngrx-entity';

const getMainState = createFeatureSelector<MainState>(MAIN_FEATURE_KEY);

const selectedChannel = createSelector(
  getMainState,
  channelQuery.getChannelEntities,
  (state, entities) => entities[state.selectedChannelId]
);

const channelEntities = createSelector(
  getMainState,
  channelQuery.getChannelEntities,
  (state, entities) => state.allChannelsIds.map((id) => entities[id])
);

export const mainQuery = {
  channelEntities,
  selectedChannel,
};
