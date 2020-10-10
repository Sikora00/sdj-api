import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgAuthCoreApplicationServicesModule } from './ng-auth-core-application-services.module';

describe('NgAuthCoreApplicationServicesModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgAuthCoreApplicationServicesModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(NgAuthCoreApplicationServicesModule).toBeDefined();
  });
});
