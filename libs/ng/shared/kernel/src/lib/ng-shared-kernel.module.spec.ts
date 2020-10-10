import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgSharedKernelModule } from './ng-shared-kernel.module';

describe('NgSharedKernelModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgSharedKernelModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(NgSharedKernelModule).toBeDefined();
  });
});
