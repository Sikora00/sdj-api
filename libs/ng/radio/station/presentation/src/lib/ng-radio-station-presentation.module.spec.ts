import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgRadioStationPresentationModule } from './ng-radio-station-presentation.module';

describe('NgRadioStationPresentationModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgRadioStationPresentationModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(NgRadioStationPresentationModule).toBeDefined();
  });
});
