import { TestBed } from '@angular/core/testing';
import { RadioFacade } from '@sdj/ng/radio/core/application-services';
import { WebSocketClient } from '@sdj/ng/shared/core/application-services';
import { createSpyObj } from 'jest-createspyobj';

import { RadioPresenter } from './radio.presenter';
import Mocked = jest.Mocked;

describe('RadioPresenterService', () => {
  let service: RadioPresenter;
  let radioFacade: Mocked<RadioFacade>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RadioPresenter,
        { provide: RadioFacade, useValue: createSpyObj(RadioFacade) },
        { provide: WebSocketClient, useValue: createSpyObj(WebSocketClient) },
      ],
    });
    service = TestBed.inject(RadioPresenter);
    radioFacade = TestBed.inject<any>(RadioFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
