import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgSharedUiSdjLoaderModule } from './ng-shared-ui-sdj-loader.module';

describe('NgSharedUiSdjLoaderModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgSharedUiSdjLoaderModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(NgSharedUiSdjLoaderModule).toBeDefined();
  });
});
