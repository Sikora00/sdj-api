import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrackPersistenceService } from '@sdj/ng/radio/core/application-services';
import { Track } from '@sdj/ng/radio/core/domain';
import { fromTrackActions } from '@sdj/ng/radio/infrastructure-track-persistence-ngrx-entity';
import { Observable, of } from 'rxjs';

@Injectable()
export class NgrxEntityTrackPersistenceService
  implements TrackPersistenceService {
  constructor(private store: Store) {}
  save(tracks: Track[]): Observable<void> {
    return of(this.store.dispatch(fromTrackActions.addTracks({ tracks })));
  }
}
