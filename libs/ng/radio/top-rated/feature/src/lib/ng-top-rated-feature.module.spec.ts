import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgTopRatedFeatureModule } from './ng-top-rated-feature.module';

describe('NgTopRatedFeatureModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgTopRatedFeatureModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(NgTopRatedFeatureModule).toBeDefined();
  });
});
