import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Channel } from '@sdj/ng/core/radio/domain';
import { SelectChannelCommand } from '../commands/select-channel/select-channel.command';
import { ChannelsReceivedEvent } from '../events/channels-received.event';

export const CHANNEL_FEATURE_KEY = 'channel';

export interface ChannelState extends EntityState<Channel> {
  selectedChannelId: string | null;
}

const adapter = createEntityAdapter<Channel>();

export interface ChannelPartialState {
  readonly [CHANNEL_FEATURE_KEY]: ChannelState;
}

export const initialState: ChannelState = {
  ...adapter.getInitialState(),
  selectedChannelId: null
};

export function reducer(
  state: ChannelState = initialState,
  action: Action
): ChannelState {
  switch (action.type) {
    case ChannelsReceivedEvent.type:
      state = adapter.addAll((<ChannelsReceivedEvent>action).channels, state);
      break;
    case SelectChannelCommand.type:
      state = {
        ...state,
        selectedChannelId: (<SelectChannelCommand>action).channelId
      };
  }
  return state;
}

export const adapterSelectors = adapter.getSelectors();
