import { async, TestBed } from '@angular/core/testing';
import { NgSharedUiSdjLoaderModule } from './ng-shared-ui-sdj-loader.module';

describe('NgSharedUiSdjLoaderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgSharedUiSdjLoaderModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgSharedUiSdjLoaderModule).toBeDefined();
  });
});
