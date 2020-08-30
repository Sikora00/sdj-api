import { QueuedTrack } from '@sdj/ng/core/radio/domain';
import { Observable } from 'rxjs';

export abstract class QueuedTrackRepository {
  abstract getQueuedTracks(channelId: string): Observable<QueuedTrack[]>;
}
