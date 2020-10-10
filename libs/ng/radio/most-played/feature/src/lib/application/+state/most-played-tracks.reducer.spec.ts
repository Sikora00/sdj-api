import { initialState, reducer } from './most-played-tracks.reducer';

describe('Track Reducer', () => {
  beforeEach(() => {});

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
