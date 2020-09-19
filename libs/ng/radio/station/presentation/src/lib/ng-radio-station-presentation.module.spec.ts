import { async, TestBed } from '@angular/core/testing';
import { NgRadioStationPresentationModule } from './ng-radio-station-presentation.module';

describe('NgRadioStationPresentationModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgRadioStationPresentationModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgRadioStationPresentationModule).toBeDefined();
  });
});
