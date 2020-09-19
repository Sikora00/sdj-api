import { async, TestBed } from '@angular/core/testing';
import { NgSharedInfrastructureSlackApiHttpModule } from './ng-shared-infrastructure-slack-api-http.module';

describe('NgSharedInfrastructureSlackApiHttpModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgSharedInfrastructureSlackApiHttpModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgSharedInfrastructureSlackApiHttpModule).toBeDefined();
  });
});
