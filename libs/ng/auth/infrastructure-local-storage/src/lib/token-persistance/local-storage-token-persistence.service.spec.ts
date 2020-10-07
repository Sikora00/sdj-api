import { TestBed } from '@angular/core/testing';

import { LocalStorageTokenPersistenceService } from './local-storage-token-persistence.service';

describe('LocalStorageTokenPersistenceService', () => {
  let service: LocalStorageTokenPersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageTokenPersistenceService],
    });
    service = TestBed.inject(LocalStorageTokenPersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
