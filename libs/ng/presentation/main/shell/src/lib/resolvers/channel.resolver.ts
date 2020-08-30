import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Channel, ChannelFacade } from '@sdj/ng/core/radio/domain';
import { SlackChannel } from '@sdj/shared/domain';
import { Observable } from 'rxjs';
import { filter, first, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class ChannelResolver implements Resolve<SlackChannel[]> {
  constructor(private channelFacade: ChannelFacade) {}

  findChannelIdParam(route: ActivatedRouteSnapshot): string {
    let channelId = route.paramMap.get('channelId');
    if (channelId) {
      return channelId;
    } else {
      route.children.some(r => {
        channelId = this.findChannelIdParam(r);
        return !!channelId;
      });
    }

    return channelId;
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const channelIdParam = this.findChannelIdParam(route);

    return this.channelFacade.channels$.pipe(
      tap(channels => {
        if (!channels || !channels.length) {
          this.channelFacade.loadChannels();
        }
      }),
      filter(channels => !!channels && !!channels.length),
      first(),
      switchMap(_ => this.channelFacade.selectedChannel$),
      tap((channel: Channel) => {
        if (!channel) {
          this.channelFacade.selectFirstChannel(channelIdParam);
        }
      }),
      filter((channel: Channel) => !!channel),
      first()
    );
  }
}
