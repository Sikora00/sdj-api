import { TestBed } from '@angular/core/testing';

import { SpeechServiceAdapter } from './speech-service.adapter';

describe('SpeechServiceAdapter', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ providers: [SpeechServiceAdapter] })
  );

  it('should be created', () => {
    const service: SpeechServiceAdapter = TestBed.inject(SpeechServiceAdapter);
    expect(service).toBeTruthy();
  });
});
