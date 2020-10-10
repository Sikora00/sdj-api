import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import {
  Channel,
  ChannelFacade,
  ExternalRadio,
  SourceType,
} from '@sdj/ng/radio/core/domain';
import { environment } from '@sdj/ng/shared/core/domain';
import { merge, Observable, of } from 'rxjs';
import { filter, first, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { RadioPartialState } from '../+state/radio.reducer';
import { radioQuery } from '../+state/radio.selectors';
import { ExternalRadioFacade } from '../../external-radio.facade';
import { RadioDataService } from '../../ports/data-services/radio-data-service.port';
import { AudioSourceChangedEvent } from '../events/audio-source-changed/audio-source-changed.event';
import { AudioSourceChangedEventPayload } from '../events/audio-source-changed/audio-source-changed.event-payload';
import { GetAudioSourceQuery } from './get-audio-source.query';

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
  ): AudioSourceChangedEventPayload {
    return {
      src: externalRadio ? externalRadio.url : channel.defaultStreamUrl,
      sourceType: SourceType.ExternalRadio,
    };
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
            of({
              src: environment.radioStreamUrl + selectedChannelId,
              sourceType: SourceType.Station,
            }),
            this.playDj$.pipe(
              map(() => ({
                src: environment.radioStreamUrl + selectedChannelId,
                sourceType: SourceType.Station,
              }))
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
        (data?: AudioSourceChangedEventPayload) =>
          new AudioSourceChangedEvent({
            src: data?.src || environment.externalStream,
            sourceType: data?.sourceType || SourceType.ExternalRadio,
          })
      )
    );
  }
}
