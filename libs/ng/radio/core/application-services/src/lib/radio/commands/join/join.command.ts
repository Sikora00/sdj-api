import { Action } from '@ngrx/store';

export class JoinCommand implements Action {
  static type = '[Radio] Join Command';
  type = JoinCommand.type;

  constructor(public channelId: string) {}
}
