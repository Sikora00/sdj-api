import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Channel } from '@sdj/ng/radio/core/domain';
import { fromChannelActions } from './channel.actions';

export const channelsFeatureKey = 'channels';

export interface State extends EntityState<Channel> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Channel> = createEntityAdapter<Channel>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(fromChannelActions.addChannel, (state, action) =>
    adapter.addOne(action.channel, state)
  ),
  on(fromChannelActions.upsertChannel, (state, action) =>
    adapter.upsertOne(action.channel, state)
  ),
  on(fromChannelActions.addChannels, (state, action) =>
    adapter.addMany(action.channels, state)
  ),
  on(fromChannelActions.upsertChannels, (state, action) =>
    adapter.upsertMany(action.channels, state)
  ),
  on(fromChannelActions.updateChannel, (state, action) =>
    adapter.updateOne(action.channel, state)
  ),
  on(fromChannelActions.updateChannels, (state, action) =>
    adapter.updateMany(action.channels, state)
  ),
  on(fromChannelActions.deleteChannel, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(fromChannelActions.deleteChannels, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(fromChannelActions.loadChannels, (state, action) =>
    adapter.setAll(action.channels, state)
  ),
  on(fromChannelActions.clearChannels, (state) => adapter.removeAll(state))
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
