import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { ChannelApiFacade } from '@sdj/ng/core/channel/api';
import {
  ExternalRadioFacade,
  QueuedTrackFacade,
  RadioFacade
} from '@sdj/ng/core/radio/application-services';
import { WebSocketClient } from '@sdj/ng/core/shared/port';
import { AwesomePlayerComponent } from '@sdj/ng/presentation/shared/presentation-players';
import { LoaderComponent } from '@sdj/ng/presentation/shared/presentation-sdj-loader';
import { createSpyObj } from 'jest-createspyobj';
import { hot } from 'jest-marbles';
import { MockComponents } from 'ng-mocks';
import { RadioActionMenuComponent } from '../../../../../presentation/src/lib/radio-action-menu/radio-action-menu.component';

import { RadioComponent } from './radio.component';
import Mocked = jest.Mocked;

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [
        RadioComponent,
        MockComponents(
          AwesomePlayerComponent,
          LoaderComponent,
          RadioActionMenuComponent
        )
      ],
      providers: [
        { provide: ChannelApiFacade, useValue: createSpyObj(ChannelApiFacade) },
        {
          provide: QueuedTrackFacade,
          useValue: createSpyObj(QueuedTrackFacade)
        },
        { provide: RadioFacade, useValue: createSpyObj(RadioFacade) },
        { provide: WebSocketClient, useValue: createSpyObj(WebSocketClient) },
        { provide: MatDialog, useValue: createSpyObj(MatDialog) },
        {
          provide: ExternalRadioFacade,
          useValue: createSpyObj(ExternalRadioFacade)
        }
      ]
    }).compileComponents();

    const radioFacade = TestBed.inject(RadioFacade);
    radioFacade.speeching$ = hot('');

    const channelFacade = TestBed.inject<ChannelApiFacade>(ChannelApiFacade);
    (channelFacade.selectedChannel$ as any) = hot('');

    const webSocketClient: Mocked<WebSocketClient> = TestBed.inject<any>(
      WebSocketClient
    );
    webSocketClient.observe = jest.fn();
    webSocketClient.observe.mockReturnValue(hot(''));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
