import { TRACK_FEATURE_KEY } from './track.reducer';
import { trackQuery } from './track.selectors';

describe('Track Selectors', () => {
  let storeState;
  const track = { id: '1234' };

  beforeEach(() => {
    storeState = {
      [TRACK_FEATURE_KEY]: {
        mostPlayedTracks: [track],
        mostPlayedTracksLoading: false
      }
    };
  });

  describe('Track Selectors', () => {
    it('mostPlayedTracks() should return the list of Tracks', () => {
      const results = trackQuery.mostPlayedTracks(storeState);

      expect(results).toMatchObject([track]);
    });
    test('mostPlayedTracksLoading() returns the boolean', () => {
      const results = trackQuery.mostPlayedTracksLoading(storeState);

      expect(results).toBe(false);
    });
  });
});
