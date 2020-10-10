import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgRadioFeatureModule } from './ng-radio-feature.module';

describe('NgRadioFeatureModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgRadioFeatureModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(NgRadioFeatureModule).toBeDefined();
  });
});
