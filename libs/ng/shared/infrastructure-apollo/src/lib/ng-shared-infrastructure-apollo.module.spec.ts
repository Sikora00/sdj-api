import { async, TestBed } from '@angular/core/testing';
import { NgSharedInfrastructureApolloModule } from './ng-shared-infrastructure-apollo.module';

describe('NgSharedInfrastructureApolloModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgSharedInfrastructureApolloModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgSharedInfrastructureApolloModule).toBeDefined();
  });
});
