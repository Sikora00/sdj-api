import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SlackServiceAdapter } from './slack-service.adapter';

describe('SlackService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SlackServiceAdapter]
    })
  );

  it('should be created', () => {
    const service: SlackServiceAdapter = TestBed.inject(SlackServiceAdapter);
    expect(service).toBeTruthy();
  });
});
