import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Channel } from '@sdj/ng/radio/core/domain';
import { first } from 'rxjs/operators';
import { MainPartialState } from '../+state/main.reducer';
import { mainQuery } from '../+state/main.selectors';
import { SelectChannelCommand } from '../commands/select-channel/select-channel.command';

@Injectable()
export class SelectChannelService {
  constructor(private store: Store<MainPartialState>) {}

  selectFirstChannel(channelId: string | null): void {
    if (channelId) {
      this.selectChannel(channelId);
    } else {
      this.selectGeneral();
    }
  }

  selectChannel(channelId: string): void {
    this.store.dispatch(new SelectChannelCommand(channelId));
  }

  private selectGeneral(): void {
    this.store
      .pipe(select(mainQuery.channelEntities), first())
      .subscribe((channels) => {
        const channel = channels.find((ch: Channel) => ch.name === 'general');
        this.selectChannel(channel.id);
      });
  }
}
