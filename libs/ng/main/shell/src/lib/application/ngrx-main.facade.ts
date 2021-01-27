import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ChannelFacade } from '@sdj/ng/radio/core/domain';
import { MainPartialState } from './+state/main.reducer';
import { mainQuery } from './+state/main.selectors';
import { LoadChannelsQuery } from './queries/load-channels/load-channels.query';
import { SelectChannelService } from './services/select-channel.service';

@Injectable()
export class NgrxMainFacade implements ChannelFacade {
  channels$ = this.store.pipe(select(mainQuery.channelEntities));
  selectedChannel$ = this.store.pipe(select(mainQuery.selectedChannel));

  constructor(
    private selectChannelService: SelectChannelService,
    private store: Store<MainPartialState>
  ) {}

  loadChannels(): void {
    this.store.dispatch(new LoadChannelsQuery());
  }

  selectFirstChannel(channelId: string | null): void {
    this.selectChannelService.selectFirstChannel(channelId);
  }

  selectChannel(channelId: string): void {
    this.selectChannelService.selectChannel(channelId);
  }
}
