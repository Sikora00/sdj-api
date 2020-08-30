import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { createSpyObj } from 'jest-createspyobj';

import { TrackFacade } from './track.facade';
import { TrackRepository } from '@sdj/ng/core/track/domain-services';

describe('TrackFacade', () => {
  let service: TrackFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrackFacade,
        provideMockStore(),
        { provide: TrackRepository, useValue: createSpyObj(TrackRepository) }
      ]
    });
    service = TestBed.inject(TrackFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
