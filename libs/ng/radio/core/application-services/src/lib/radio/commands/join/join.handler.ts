import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { WebSocketClient } from '@sdj/ng/shared/core/application-services';
import { WebSocketEvents } from '@sdj/shared/domain';
import { of } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';
import { RoomIsRunningEvent } from '../../events/room-is-running.event';
import { JoinCommand } from './join.command';

@Injectable()
export class JoinHandler {
  @Effect() handle$ = this.actions$.pipe(
    ofType(JoinCommand.type),
    tap((command: JoinCommand) => this.handle(command)),
    switchMap(() =>
      this.ws.observe<void>(WebSocketEvents.roomIsRunning).pipe(
        first(),
        switchMap(() => of(new RoomIsRunningEvent()))
      )
    )
  );

  handle(command: JoinCommand): void {
    this.ws.emit(WebSocketEvents.join, { room: command.channelId });
  }

  constructor(private actions$: Actions, private ws: WebSocketClient) {}
}
