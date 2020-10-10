import { trackFeatureKey } from '@sdj/ng/radio/infrastructure-track-persistence-ngrx-entity';
import { MOST_PLAYED_TRACKS_FEATURE_KEY } from './most-played-tracks.reducer';
import { mostPlayedTracksQuery } from './most-played-tracks.selectors';

describe('Track Selectors', () => {
  let storeState;
  const track = { id: '1234' };

  beforeEach(() => {
    storeState = {
      [trackFeatureKey]: {
        ids: ['1234'],
        entities: { '1234': track },
      },
      [MOST_PLAYED_TRACKS_FEATURE_KEY]: {
        mostPlayedTracksIds: ['1234'],
        mostPlayedTracksLoading: false,
      },
    };
  });

  describe('Track Selectors', () => {
    it('mostPlayedTracks() should return the list of Tracks', () => {
      const results = mostPlayedTracksQuery.mostPlayedTracks(storeState);

      expect(results).toMatchObject([track]);
    });
    test('mostPlayedTracksLoading() returns the boolean', () => {
      const results = mostPlayedTracksQuery.mostPlayedTracksLoading(storeState);

      expect(results).toBe(false);
    });
  });
});
