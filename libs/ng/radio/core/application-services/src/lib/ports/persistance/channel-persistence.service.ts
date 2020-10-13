import { Channel } from '@sdj/ng/radio/core/domain';
import { Observable } from 'rxjs';

export abstract class ChannelPersistenceService {
  abstract save(tracks: Channel[]): Observable<void>;
}
