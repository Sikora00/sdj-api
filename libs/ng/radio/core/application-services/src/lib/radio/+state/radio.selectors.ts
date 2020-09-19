import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RADIO_FEATURE_KEY, RadioState } from './radio.reducer';

// Lookup the 'Radio' feature state managed by NgRx
const getRadioState = createFeatureSelector<RadioState>(RADIO_FEATURE_KEY);

const audioSource = createSelector(getRadioState, (state) => state.audioSource);
const sourceType = createSelector(getRadioState, (state) => state.sourceType);

const roomIsRunning = createSelector(
  getRadioState,
  (state: RadioState) => state.roomIsRunning
);

export const radioQuery = {
  audioSource,
  sourceType,
  roomIsRunning,
};
