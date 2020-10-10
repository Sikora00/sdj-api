import { Track } from '@sdj/ng/radio/core/domain';
import { Observable } from 'rxjs';

export abstract class TrackPersistenceService {
  abstract save(tracks: Track[]): Observable<void>;
}
