import { async, TestBed } from '@angular/core/testing';
import { NgCoreQueuedTrackApplicationServicesModule } from './ng-core-queued-track-application-services.module';

describe('NgCoreQueuedTrackApplicationServicesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgCoreQueuedTrackApplicationServicesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgCoreQueuedTrackApplicationServicesModule).toBeDefined();
  });
});
