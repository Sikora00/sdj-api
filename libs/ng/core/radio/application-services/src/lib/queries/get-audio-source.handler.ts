import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Channel, ChannelFacade, ExternalRadio } from '@sdj/ng/core/radio/domain';
import { environment } from '@sdj/ng/core/shared/domain';
import { merge, Observable, of } from 'rxjs';
import { filter, first, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { RadioPartialState } from '../+state/radio.reducer';
import { radioQuery } from '../+state/radio.selectors';
import { AudioSourceChangedEvent } from '../events/audio-source-changed.event';
import { ExternalRadioFacade } from '../external-radio.facade';
import { GetAudioSourceQuery } from './get-audio-source.query';
import { RadioDataService } from '../ports/radio-data-service.port';

@Injectable({ providedIn: 'root' })
export class GetAudioSourceHandler {
  playDj$ = this.radioDataService.getPlayDj();
  playRadio$ = this.radioDataService.getPlayRadio();
  roomIsRunning$ = this.store.pipe(select(radioQuery.roomIsRunning));

  @Effect() handle$ = this.actions$.pipe(
    ofType(GetAudioSourceQuery.type),
    withLatestFrom(
      this.channelFacade.selectedChannel$,
      this.externalRadioFacade.selectedExternalRadio$
    ),
    switchMap(
      ([query, selectedChannel, selectedExternalRadio]: [
        GetAudioSourceQuery,
        Channel,
        ExternalRadio
      ]) => this.handle(selectedChannel, selectedExternalRadio)
    )
  );

  constructor(
    private actions$: Actions,
    private channelFacade: ChannelFacade,
    private externalRadioFacade: ExternalRadioFacade,
    private radioDataService: RadioDataService,
    private store: Store<RadioPartialState>
  ) {}

  private static getStreamFromExternalRadioOrChannel(
    channel: Channel,
    externalRadio?: ExternalRadio
  ): string {
    return externalRadio ? externalRadio.url : channel.defaultStreamUrl;
  }

  handle(channel: Channel, externalRadio: ExternalRadio): Observable<Action> {
    const selectedChannelId = channel.id;
    return merge(
      of(
        GetAudioSourceHandler.getStreamFromExternalRadioOrChannel(
          channel,
          externalRadio
        )
      ),
      this.roomIsRunning$.pipe(
        filter(Boolean),
        first(),
        switchMap(() =>
          merge(
            of(environment.radioStreamUrl + selectedChannelId),
            this.playDj$.pipe(
              map(() => environment.radioStreamUrl + selectedChannelId)
            ),
            this.playRadio$.pipe(
              map(() =>
                GetAudioSourceHandler.getStreamFromExternalRadioOrChannel(
                  channel,
                  externalRadio
                )
              )
            )
          )
        )
      )
    ).pipe(
      map(
        streamUrl =>
          new AudioSourceChangedEvent(streamUrl || environment.externalStream)
      )
    );
  }
}
