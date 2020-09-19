import { JoinCommand } from '../commands/join/join.command';
import { RoomIsRunningEvent } from '../events/room-is-running.event';
import { initialState, RadioState, reducer } from './radio.reducer';

describe('Radio Reducer', () => {
  beforeEach(() => {});

  describe('valid Radio actions ', () => {
    it('should set that room is not running on joining to a room', () => {
      const action = new JoinCommand('1234');
      const result: RadioState = reducer(initialState, action);

      expect(result.roomIsRunning).toBe(false);
    });

    it('should set that room is running on RoomIsRunningEvent', () => {
      const action = new RoomIsRunningEvent();
      const result: RadioState = reducer(initialState, action);

      expect(result.roomIsRunning).toBe(true);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
