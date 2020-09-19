import { async, TestBed } from '@angular/core/testing';
import { NgMainShellModule } from './ng-main-shell.module';

describe('NgMainShellModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgMainShellModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgMainShellModule).toBeDefined();
  });
});
