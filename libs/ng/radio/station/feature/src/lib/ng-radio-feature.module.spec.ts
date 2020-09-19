import { async, TestBed } from '@angular/core/testing';
import { NgRadioFeatureModule } from './ng-radio-feature.module';

describe('NgRadioFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgRadioFeatureModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgRadioFeatureModule).toBeDefined();
  });
});
