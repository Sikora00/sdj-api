import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Channel, ChannelRepository } from '@sdj/ng/core/radio/domain';
import { WebSocketClient } from '@sdj/ng/core/shared/port';
import { WebSocketEvents } from '@sdj/shared/domain';
import { merge, Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ChannelPartialState } from '../../+state/channel.reducer';
import { channelQuery } from '../../+state/channel.selectors';
import { ChannelsReceivedEvent } from '../../events/channels-received.event';
import { LoadChannelsQuery } from './load-channels.query';

@Injectable({ providedIn: 'root' })
export class LoadChannelsHandler {
  @Effect() handle$ = this.actions$.pipe(
    ofType(LoadChannelsQuery.type),
    switchMap((query: LoadChannelsQuery) => this.handle(query))
  );

  handle(query: LoadChannelsQuery): Observable<Action> {
    return merge(
      this.channelRepository.getChannels(),
      this.ws.createSubject(WebSocketEvents.channels).pipe(
        withLatestFrom(this.store.select(channelQuery.channels)),
        map(([channels, storedChannels]: [Channel[], Channel[]]) =>
          storedChannels.map((channel: Channel) => ({
            ...channel,
            ...channels[channel.id],
            name: channel.name
          }))
        )
      )
    ).pipe(map(channels => new ChannelsReceivedEvent(channels)));
  }

  constructor(
    private actions$: Actions,
    private channelRepository: ChannelRepository,
    private store: Store<ChannelPartialState>,
    private ws: WebSocketClient
  ) {}
}
