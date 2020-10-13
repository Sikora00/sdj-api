import { Action } from '@ngrx/store';
import { SelectChannelCommand } from '../commands/select-channel/select-channel.command';
import { ChannelsReceivedEvent } from '../events/channels-received.event';

export const MAIN_FEATURE_KEY = 'main';

export interface MainState {
  allChannelsIds: string[];
  selectedChannelId: string | null;
}

export interface MainPartialState {
  readonly [MAIN_FEATURE_KEY]: MainState;
}

export const initialState: MainState = {
  allChannelsIds: [],
  selectedChannelId: null,
};

export function reducer(
  state: MainState = initialState,
  action: Action
): MainState {
  switch (action.type) {
    case ChannelsReceivedEvent.type:
      state = {
        ...state,
        allChannelsIds: (<ChannelsReceivedEvent>action).channels.map(
          (channel) => channel.id
        ),
      };
      break;
    case SelectChannelCommand.type:
      state = {
        ...state,
        selectedChannelId: (<SelectChannelCommand>action).channelId,
      };
  }
  return state;
}
