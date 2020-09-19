import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  adapterSelectors,
  CHANNEL_FEATURE_KEY,
  ChannelState,
} from './channel.reducer';

const getChannelState = createFeatureSelector<ChannelState>(
  CHANNEL_FEATURE_KEY
);

const channels = createSelector(getChannelState, adapterSelectors.selectAll);

const channelEntities = createSelector(
  getChannelState,
  adapterSelectors.selectEntities
);

const selectedChannelId = createSelector(
  getChannelState,
  (state) => state.selectedChannelId
);

const selectedChannel = createSelector(
  channelEntities,
  selectedChannelId,
  (entities, selectedId) => entities[selectedId]
);

export const channelQuery = {
  channels,
  channelEntities,
  selectedChannel,
};
