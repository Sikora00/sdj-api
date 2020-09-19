import { TestBed } from '@angular/core/testing';

import { WebSocketClientAdapter } from './web-socket-client-adapter';

describe('WebSocketClientAdapter', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ providers: [WebSocketClientAdapter] })
  );

  it('should be created', () => {
    const service: WebSocketClientAdapter = TestBed.inject(
      WebSocketClientAdapter
    );
    expect(service).toBeTruthy();
  });
});
