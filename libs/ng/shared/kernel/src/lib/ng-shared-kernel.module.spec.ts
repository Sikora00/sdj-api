import { async, TestBed } from '@angular/core/testing';
import { NgSharedKernelModule } from './ng-shared-kernel.module';

describe('NgSharedKernelModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgSharedKernelModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgSharedKernelModule).toBeDefined();
  });
});
