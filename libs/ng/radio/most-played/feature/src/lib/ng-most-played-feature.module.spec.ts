import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgMostPlayedFeatureModule } from './ng-most-played-feature.module';

describe('NgMostPlayedFeatureModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgMostPlayedFeatureModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(NgMostPlayedFeatureModule).toBeDefined();
  });
});
