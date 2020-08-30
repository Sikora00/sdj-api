import { QueuedTrack } from '../../entities/queued-track.entity';
import { Observable } from 'rxjs';

export abstract class QueuedTrackRepository {
  abstract getQueuedTracks(channelId: string): Observable<QueuedTrack[]>;
}
