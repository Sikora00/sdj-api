import { async, TestBed } from '@angular/core/testing';
import { NgRadioInfrastructureChannelHttpModule } from './ng-radio-infrastructure-channel-http.module';

describe('NgRadioInfrastructureChannelHttpModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgRadioInfrastructureChannelHttpModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgRadioInfrastructureChannelHttpModule).toBeDefined();
  });
});
