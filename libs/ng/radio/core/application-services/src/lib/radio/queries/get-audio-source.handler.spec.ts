import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Channel, ChannelFacade, SourceType } from '@sdj/ng/radio/core/domain';
import { WebSocketClient } from '@sdj/ng/shared/core/application-services';
import { environment } from '@sdj/ng/shared/core/domain';
import { createSpyObj } from 'jest-createspyobj';
import { cold, hot } from 'jest-marbles';
import { Observable } from 'rxjs';
import { ExternalRadioFacade } from '../../external-radio.facade';
import { RadioDataService } from '../../ports/data-services/radio-data-service.port';
import { AudioSourceChangedEvent } from '../events/audio-source-changed/audio-source-changed.event';
import { GetAudioSourceHandler } from './get-audio-source.handler';
import { GetAudioSourceQuery } from './get-audio-source.query';
import Mocked = jest.Mocked;

describe('TrackFacade', () => {
  let actions: Observable<Action>;
  let handler: GetAudioSourceHandler;
  let channelFacade: Mocked<ChannelFacade>;
  let externalRadioFacade: Mocked<ExternalRadioFacade>;

  const channel = { id: '1234', defaultStreamUrl: 'url' } as Partial<Channel>;
  const channelRadioStream = environment.radioStreamUrl + channel.id;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetAudioSourceHandler,
        {
          provide: RadioDataService,
          useValue: { getPlayDj: jest.fn(), getPlayRadio: jest.fn() },
        },
        { provide: WebSocketClient, useValue: {} },
        { provide: ChannelFacade, useValue: {} },
        {
          provide: ExternalRadioFacade,
          useValue: createSpyObj(ExternalRadioFacade),
        },
        provideMockActions(() => actions),
        provideMockStore({ initialState: {} }),
      ],
    });

    const ws: Mocked<WebSocketClient> = TestBed.inject(WebSocketClient) as any;
    ws.observe = jest.fn();
    ws.observe.mockReturnValue(hot('--a-|'));

    channelFacade = TestBed.inject(ChannelFacade) as jest.Mocked<ChannelFacade>;
    externalRadioFacade = TestBed.inject(ExternalRadioFacade) as any;
  });

  describe('handle$', () => {
    test('emits channel default stream on the beginning', () => {
      channelFacade.selectedChannel$ = cold('a', { a: channel });
      externalRadioFacade.selectedExternalRadio$ = cold('a', {
        a: null,
      }) as any;
      handler = TestBed.inject(GetAudioSourceHandler);
      handler.roomIsRunning$ = cold('-');

      const query = new GetAudioSourceQuery();
      actions = hot('-a-|', { a: query });
      expect(handler.handle$).toBeObservable(
        cold('-a', {
          a: new AudioSourceChangedEvent({
            src: channel.defaultStreamUrl,
            sourceType: SourceType.ExternalRadio,
          }),
        })
      );
    });

    test('emits channel stream when room is running', () => {
      channelFacade.selectedChannel$ = cold('a', { a: channel });
      externalRadioFacade.selectedExternalRadio$ = cold('a', {
        a: null,
      }) as any;
      handler = TestBed.inject(GetAudioSourceHandler);
      handler.roomIsRunning$ = cold('-a');
      handler.playDj$ = cold('');
      handler.playRadio$ = cold('');

      const query = new GetAudioSourceQuery();
      actions = hot('-a-|', { a: query });
      expect(handler.handle$).toBeObservable(
        hot('-ab', {
          a: new AudioSourceChangedEvent({
            src: channel.defaultStreamUrl,
            sourceType: SourceType.ExternalRadio,
          }),
          b: new AudioSourceChangedEvent({
            src: channelRadioStream,
            sourceType: SourceType.Station,
          }),
        })
      );
    });

    test('switch between channel stream and radio when room is running', () => {
      channelFacade.selectedChannel$ = cold('a', { a: channel });
      externalRadioFacade.selectedExternalRadio$ = cold('a', {
        a: null,
      }) as any;
      handler = TestBed.inject(GetAudioSourceHandler);
      handler.roomIsRunning$ = cold('-a');
      handler.playDj$ = cold('-a-a-a');
      handler.playRadio$ = cold('--a-a');

      const query = new GetAudioSourceQuery();
      actions = hot('-a-|', { a: query });
      expect(handler.handle$).toBeObservable(
        hot('-abbabab', {
          a: new AudioSourceChangedEvent({
            src: channel.defaultStreamUrl,
            sourceType: SourceType.ExternalRadio,
          }),
          b: new AudioSourceChangedEvent({
            src: channelRadioStream,
            sourceType: SourceType.Station,
          }),
        })
      );
    });
  });
});
