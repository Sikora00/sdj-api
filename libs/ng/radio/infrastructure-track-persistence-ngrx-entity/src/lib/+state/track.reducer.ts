import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Track } from '@sdj/ng/radio/core/domain';
import { fromTrackActions } from './track.actions';

export const trackFeatureKey = 'track';

export interface State extends EntityState<Track> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Track> = createEntityAdapter<Track>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(fromTrackActions.addTrack, (state, action) =>
    adapter.addOne(action.track, state)
  ),
  on(fromTrackActions.upsertTrack, (state, action) =>
    adapter.upsertOne(action.track, state)
  ),
  on(fromTrackActions.addTracks, (state, action) =>
    adapter.addMany(action.tracks, state)
  ),
  on(fromTrackActions.upsertTracks, (state, action) =>
    adapter.upsertMany(action.tracks, state)
  ),
  on(fromTrackActions.updateTrack, (state, action) =>
    adapter.updateOne(action.track, state)
  ),
  on(fromTrackActions.updateTracks, (state, action) =>
    adapter.updateMany(action.tracks, state)
  ),
  on(fromTrackActions.deleteTrack, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(fromTrackActions.deleteTracks, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(fromTrackActions.loadTracks, (state, action) =>
    adapter.setAll(action.tracks, state)
  ),
  on(fromTrackActions.clearTracks, (state) => adapter.removeAll(state))
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
