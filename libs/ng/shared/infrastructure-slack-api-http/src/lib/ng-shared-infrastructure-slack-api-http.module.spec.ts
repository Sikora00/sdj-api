import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgSharedInfrastructureSlackApiHttpModule } from './ng-shared-infrastructure-slack-api-http.module';

describe('NgSharedInfrastructureSlackApiHttpModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgSharedInfrastructureSlackApiHttpModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(NgSharedInfrastructureSlackApiHttpModule).toBeDefined();
  });
});
