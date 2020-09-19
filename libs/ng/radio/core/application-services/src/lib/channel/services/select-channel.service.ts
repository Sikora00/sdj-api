import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Channel } from '@sdj/ng/radio/core/domain';
import { first } from 'rxjs/operators';
import { ChannelPartialState } from '../+state/channel.reducer';
import { channelQuery } from '../+state/channel.selectors';
import { SelectChannelCommand } from '../commands/select-channel/select-channel.command';

@Injectable()
export class SelectChannelService {
  constructor(private store: Store<ChannelPartialState>) {}

  selectFirstChannel(channelId: string | null): void {
    this.store
      .pipe(select(channelQuery.channelEntities), first())
      .subscribe((channelEntities) => {
        if (channelId) {
          const channel = channelEntities[channelId];
          this.selectChannel(channel.id);
        } else {
          this.selectGeneral();
        }
      });
  }

  selectChannel(channelId: string): void {
    this.store.dispatch(new SelectChannelCommand(channelId));
  }

  private selectGeneral(): void {
    this.store
      .pipe(select(channelQuery.channels), first())
      .subscribe((channels) => {
        const channel = channels.find((ch: Channel) => ch.name === 'general');
        this.selectChannel(channel.id);
      });
  }
}
