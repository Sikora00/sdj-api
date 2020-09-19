import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { WebSocketClient } from '@sdj/ng/shared/core/application-services';
import { createSpyObj } from 'jest-createspyobj';
import { hot } from 'jest-marbles';

import { Observable } from 'rxjs';
import { RoomIsRunningEvent } from '../../events/room-is-running.event';
import { JoinCommand } from './join.command';
import { JoinHandler } from './join.handler';
import Mocked = jest.Mocked;

describe('JoinHandler', () => {
  let actions: Observable<any>;
  let handler: JoinHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JoinHandler,
        { provide: WebSocketClient, useValue: createSpyObj(WebSocketClient) },
        { provide: WebSocketClient, useValue: createSpyObj(WebSocketClient) },
        provideMockActions(() => actions),
        provideMockStore({ initialState: {} }),
      ],
    });

    handler = TestBed.inject(JoinHandler);
    const ws: Mocked<WebSocketClient> = TestBed.inject(WebSocketClient) as any;
    ws.observe = jest.fn();
    ws.observe.mockReturnValue(hot('--a-|'));
  });

  describe('handle$', () => {
    it('should run #handle', () => {
      handler.handle = jest.fn();
      const command = new JoinCommand('1234');
      actions = hot('-a-|', { a: command });
      expect(handler.handle$).toSatisfyOnFlush(() => {
        expect(handler.handle).toHaveBeenCalledWith(command);
      });
      expect(handler.handle$).toBeObservable(
        hot('^-a|', { a: new RoomIsRunningEvent() })
      );
    });
  });
});
