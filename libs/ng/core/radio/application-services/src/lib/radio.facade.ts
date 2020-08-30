import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Channel, ChannelApiFacade } from '@sdj/ng/core/channel/api';
import { SpeechService, WebSocketClient } from '@sdj/ng/core/shared/port';
import { WebSocketEvents } from '@sdj/shared/domain';
import { Observable, Subject, zip } from 'rxjs';
import { delay, filter, map, skip } from 'rxjs/operators';
import { RadioPartialState } from './+state/radio.reducer';
import { radioQuery } from './+state/radio.selectors';
import { JoinCommand } from './commands/join/join.command';
import { ExternalRadioFacade } from './external-radio.facade';
import { GetAudioSourceHandler } from './queries/get-audio-source.handler';
import { GetAudioSourceQuery } from './queries/get-audio-source.query';

@Injectable()
export class RadioFacade {
  audioSource$ = this.store.pipe(select(radioQuery.audioSource));
  speeching$: Observable<boolean> = this.speechService.speeching$;

  private pozdro$: Subject<{ message: string }>;

  constructor(
    private channelFacade: ChannelApiFacade,
    private externalRadioFacade: ExternalRadioFacade,
    private getAudioSourceHandler: GetAudioSourceHandler,
    private speechService: SpeechService,
    private store: Store<RadioPartialState>,
    private ws: WebSocketClient
  ) {
    this.onSelectedExternalRadioChange();
  }

  join(channel: Channel): void {
    this.store.dispatch(new JoinCommand(channel.id));
    this.getAudioSource();
  }

  leaveChannel(channel: Channel): void {
    this.ws.emit(WebSocketEvents.leaveChannel, channel.id);
  }

  startListeningForPozdro(): void {
    this.pozdro$ = this.ws.createSubject(WebSocketEvents.pozdro);
    const input = this.pozdro$;
    const signal = this.speeching$.pipe(filter(speeching => !speeching));
    const output = zip(input, signal);
    output
      .pipe(
        map(([i, s]) => i),
        delay(0)
      )
      .subscribe((data: any) => {
        this.speechService.speak(data.message);
      });
  }

  stopListeningForPozdro(): void {
    this.pozdro$.complete();
  }

  private getAudioSource(): void {
    this.store.dispatch(new GetAudioSourceQuery());
  }

  private onSelectedExternalRadioChange(): void {
    this.externalRadioFacade.selectedExternalRadio$
      .pipe(skip(1))
      .subscribe(() => {
        this.getAudioSource();
      });
  }
}
