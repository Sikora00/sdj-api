import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Channel } from '@sdj/ng/radio/core/domain';
import { WebSocketClient } from '@sdj/ng/shared/core/application-services';
import { WebSocketEvents } from '@sdj/shared/domain';
import { merge, Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ChannelPartialState } from '../../+state/channel.reducer';
import { channelQuery } from '../../+state/channel.selectors';
import { ChannelDataService } from '../../../ports/data-services/channel-data.service';
import { ChannelsReceivedEvent } from '../../events/channels-received.event';
import { LoadChannelsQuery } from './load-channels.query';

@Injectable()
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
        map(([channel, storedChannels]: [Channel, Channel[]]) =>
          storedChannels.map((storedChannel: Channel) => {
            if (channel.id === storedChannel.id) {
              return channel;
            }
            return storedChannel;
          })
        )
      )
    ).pipe(map((channels) => new ChannelsReceivedEvent(channels)));
  }

  constructor(
    private actions$: Actions,
    private channelRepository: ChannelDataService,
    private store: Store<ChannelPartialState>,
    private ws: WebSocketClient
  ) {}
}
