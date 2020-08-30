import { Action } from '@ngrx/store';

export class SelectChannelCommand implements Action {
  static type = '[Channel] Select Channel';
  type = SelectChannelCommand.type;

  constructor(public channelId: string) {}
}
