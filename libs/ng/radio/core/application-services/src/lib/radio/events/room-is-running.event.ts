import { Action } from '@ngrx/store';

export class RoomIsRunningEvent implements Action {
  static type = '[Radio] Room Is Running';
  type = RoomIsRunningEvent.type;
}
