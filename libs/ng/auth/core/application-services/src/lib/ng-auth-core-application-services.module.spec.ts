import { async, TestBed } from '@angular/core/testing';
import { NgAuthCoreApplicationServicesModule } from './ng-auth-core-application-services.module';

describe('NgAuthCoreApplicationServicesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgAuthCoreApplicationServicesModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgAuthCoreApplicationServicesModule).toBeDefined();
  });
});
