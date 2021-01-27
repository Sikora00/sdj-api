import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  ChannelDataService,
  ChannelPersistenceService,
} from '@sdj/ng/radio/core/application-services';
import { Channel } from '@sdj/ng/radio/core/domain';
import { WebSocketClient } from '@sdj/ng/shared/core/application-services';
import { WebSocketEvents } from '@sdj/shared/domain';
import { merge, Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { MainPartialState } from '../../+state/main.reducer';
import { ChannelsReceivedEvent } from '../../events/channels-received.event';
import { LoadChannelsQuery } from './load-channels.query';

@Injectable()
export class LoadChannelsHandler {
  private channelUpdateSubscription: Subscription;

  @Effect() handle$ = this.actions$.pipe(
    ofType(LoadChannelsQuery.type),
    switchMap((query: LoadChannelsQuery) => this.handle(query))
  );

  handle(query: LoadChannelsQuery): Observable<Action> {
    return this.channelDataService.getChannels().pipe(
      tap(() => this.subscribeToChannelUpdate()),
      tap((channels) => this.channelRepository.save(channels)),
      map((channels) => new ChannelsReceivedEvent(channels))
    );
  }

  private subscribeToChannelUpdate(): void {
    this.channelUpdateSubscription = this.ws
      .createSubject<Channel>(WebSocketEvents.channels)
      .pipe(
        map((channel) => [channel]),
        tap((channels) => this.channelRepository.save(channels))
      )
      .subscribe();
  }

  constructor(
    private actions$: Actions,
    private channelDataService: ChannelDataService,
    private store: Store<MainPartialState>,
    private channelRepository: ChannelPersistenceService,
    private ws: WebSocketClient
  ) {}
}
