import { QueuedTrack } from '@sdj/ng/radio/core/domain';
import { Observable } from 'rxjs';

export abstract class QueuedTrackRepository {
  abstract getQueuedTracks(channelId: string): Observable<QueuedTrack[]>;
}
