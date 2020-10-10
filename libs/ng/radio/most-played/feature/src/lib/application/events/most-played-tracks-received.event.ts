import { Action } from '@ngrx/store';

export class MostPlayedTracksReceivedEvent implements Action {
  static type = '[Track] Most Played Tracks Received';
  type = MostPlayedTracksReceivedEvent.type;

  constructor(public trackIds: string[]) {}
}
