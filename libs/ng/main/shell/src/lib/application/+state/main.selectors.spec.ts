import { MAIN_FEATURE_KEY } from './main.reducer';
import { channelQuery } from './main.selectors';

describe('Channel Selectors', () => {
  let storeState;
  const channel = { id: '1234' };

  beforeEach(() => {
    storeState = {
      [MAIN_FEATURE_KEY]: { entities: { ['1234']: channel }, ids: ['1234'] },
    };
  });

  describe('Channel Selectors', () => {
    it('channels() should return the list of Channels', () => {
      const results = channelQuery.channels(storeState);

      expect(results).toMatchObject([channel]);
    });
  });
});
