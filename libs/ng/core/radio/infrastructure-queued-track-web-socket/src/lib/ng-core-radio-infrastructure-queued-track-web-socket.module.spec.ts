import { async, TestBed } from '@angular/core/testing';
import { NgCoreRadioInfrastructureQueuedTrackWebSocketModule } from './ng-core-radio-infrastructure-queued-track-web-socket.module';

describe('NgCoreRadioInfrastructureQueuedTrackWebSocketModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgCoreRadioInfrastructureQueuedTrackWebSocketModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgCoreRadioInfrastructureQueuedTrackWebSocketModule).toBeDefined();
  });
});
