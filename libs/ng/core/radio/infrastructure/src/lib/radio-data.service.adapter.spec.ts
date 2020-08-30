import { TestBed } from '@angular/core/testing';
import { WebSocketClient } from '@sdj/ng/core/shared/application-services';
import { RadioDataServiceAdapter } from './radio-data.service.adapter';

describe('RadioDataServiceAdapter', () => {
  let service: RadioDataServiceAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RadioDataServiceAdapter,
        {
          provide: WebSocketClient,
          useValue: { observe: jest.fn() }
        }
      ]
    });
    service = TestBed.inject(RadioDataServiceAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
