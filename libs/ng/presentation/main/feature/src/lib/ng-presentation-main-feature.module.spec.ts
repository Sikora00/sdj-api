import { async, TestBed } from '@angular/core/testing';
import { NgPresentationMainFeatureModule } from './ng-presentation-main-feature.module';

describe('NgPresentationMainFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgPresentationMainFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgPresentationMainFeatureModule).toBeDefined();
  });
});
