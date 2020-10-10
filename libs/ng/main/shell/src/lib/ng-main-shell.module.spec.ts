import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgMainShellModule } from './ng-main-shell.module';

describe('NgMainShellModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgMainShellModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(NgMainShellModule).toBeDefined();
  });
});
