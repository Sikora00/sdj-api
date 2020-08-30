import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TrackDataService } from '@sdj/ng/core/radio/application-services';
import { createSpyObj } from 'jest-createspyobj';

import { TrackFacade } from './track.facade';

describe('TrackFacade', () => {
  let service: TrackFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrackFacade,
        provideMockStore(),
        { provide: TrackDataService, useValue: createSpyObj(TrackDataService) }
      ]
    });
    service = TestBed.inject(TrackFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
