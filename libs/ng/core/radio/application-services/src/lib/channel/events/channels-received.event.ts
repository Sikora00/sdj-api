import { Action } from '@ngrx/store';
import { Channel } from '@sdj/ng/core/radio/domain';

export class ChannelsReceivedEvent implements Action {
  static type = '[Channel] Channels Received';
  type = ChannelsReceivedEvent.type;

  constructor(public channels: Channel[]) {}
}
