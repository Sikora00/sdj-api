import { Injectable } from '@angular/core';
import { QueuedTrackRepository } from '@sdj/ng/core/radio/application-services';
import { QueuedTrack } from '@sdj/ng/core/radio/domain';
import { WebSocketClient } from '@sdj/ng/core/shared/application-services';
import { WebSocketEvents } from '@sdj/shared/domain';
import { defer, Observable } from 'rxjs';

@Injectable()
export class QueuedTrackRepositoryAdapter implements QueuedTrackRepository {
  constructor(private ws: WebSocketClient) {}

  getQueuedTracks(channelId: string): Observable<QueuedTrack[]> {
    return defer(() => {
      this.ws.emit(WebSocketEvents.queuedTrackList, channelId);
      return this.ws.observe<QueuedTrack[]>(WebSocketEvents.queuedTrackList);
    });
  }
}
