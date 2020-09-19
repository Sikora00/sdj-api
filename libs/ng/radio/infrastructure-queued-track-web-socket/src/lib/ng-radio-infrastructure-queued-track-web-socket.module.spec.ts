import { async, TestBed } from '@angular/core/testing';
import { NgRadioInfrastructureQueuedTrackWebSocketModule } from './ng-radio-infrastructure-queued-track-web-socket.module';

describe('NgRadioInfrastructureQueuedTrackWebSocketModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgRadioInfrastructureQueuedTrackWebSocketModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgRadioInfrastructureQueuedTrackWebSocketModule).toBeDefined();
  });
});
