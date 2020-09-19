import { async, TestBed } from '@angular/core/testing';
import { NgCoreTrackApplicationServicesModule } from './ng-core-track-application-services.module';

describe('NgCoreTrackApplicationServicesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgCoreTrackApplicationServicesModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgCoreTrackApplicationServicesModule).toBeDefined();
  });
});
