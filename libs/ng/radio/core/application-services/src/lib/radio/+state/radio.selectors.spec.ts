import { radioQuery } from './radio.selectors';

describe('Radio Selectors', () => {
  let storeState;

  beforeEach(() => {
    storeState = { radio: { roomIsRunning: true } };
  });

  describe('Radio Selectors', () => {
    it('roomIsRunning() should return a boolean', () => {
      const results = radioQuery.roomIsRunning(storeState);

      expect(results).toBe(true);
    });
  });
});
