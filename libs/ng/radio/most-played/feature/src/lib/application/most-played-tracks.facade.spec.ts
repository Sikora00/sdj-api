import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TrackDataService } from '@sdj/ng/radio/core/application-services';
import { createSpyObj } from 'jest-createspyobj';

import { MostPlayedTracksFacade } from './most-played-tracks.facade';

describe('TrackFacade', () => {
  let service: MostPlayedTracksFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MostPlayedTracksFacade,
        provideMockStore(),
        { provide: TrackDataService, useValue: createSpyObj(TrackDataService) },
      ],
    });
    service = TestBed.inject(MostPlayedTracksFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
