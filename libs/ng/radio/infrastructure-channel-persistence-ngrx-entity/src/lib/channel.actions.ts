import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Channel } from '@sdj/ng/radio/core/domain';

export namespace fromChannelActions {
  export const loadChannels = createAction(
    '[Channel/API] Load Channels',
    props<{ channels: Channel[] }>()
  );

  export const addChannel = createAction(
    '[Channel/API] Add Channel',
    props<{ channel: Channel }>()
  );

  export const upsertChannel = createAction(
    '[Channel/API] Upsert Channel',
    props<{ channel: Channel }>()
  );

  export const addChannels = createAction(
    '[Channel/API] Add Channels',
    props<{ channels: Channel[] }>()
  );

  export const upsertChannels = createAction(
    '[Channel/API] Upsert Channels',
    props<{ channels: Channel[] }>()
  );

  export const updateChannel = createAction(
    '[Channel/API] Update Channel',
    props<{ channel: Update<Channel> }>()
  );

  export const updateChannels = createAction(
    '[Channel/API] Update Channels',
    props<{ channels: Update<Channel>[] }>()
  );

  export const deleteChannel = createAction(
    '[Channel/API] Delete Channel',
    props<{ id: string }>()
  );

  export const deleteChannels = createAction(
    '[Channel/API] Delete Channels',
    props<{ ids: string[] }>()
  );

  export const clearChannels = createAction('[Channel/API] Clear Channels');
}
