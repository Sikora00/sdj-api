import { async, TestBed } from '@angular/core/testing';
import { NgCoreRadioInfrastructureChannelHttpModule } from './ng-core-radio-infrastructure-channel-http.module';

describe('NgCoreRadioInfrastructureChannelHttpModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgCoreRadioInfrastructureChannelHttpModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgCoreRadioInfrastructureChannelHttpModule).toBeDefined();
  });
});
