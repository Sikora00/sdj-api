import { Injectable } from '@nestjs/common';
import {
  QueuedTrack,
  QueuedTrackRepositoryInterface,
} from '@sdj/backend/radio/core/domain';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class WsQueueSynchronizationService {
  private readonly queues: Record<string, Subject<QueuedTrack[]>> = {};

  constructor(private queuedTrackRepository: QueuedTrackRepositoryInterface) {}

  /**
   * @ToDO there is a place for a memory leak because we should remove unused subjects
   * @param channelId
   */
  listenToQueue(channelId: string): Observable<QueuedTrack[]> {
    let queue: Observable<QueuedTrack[]> = this.queues[channelId];
    if (!queue) {
      queue = this.addQueue(channelId);
    }

    return queue;
  }

  async updateQueue(channelId): Promise<void> {
    const queueSubject = this.queues[channelId];
    if (queueSubject) {
      queueSubject.next(await this.queuedTrackRepository.getQueue(channelId));
    }
  }

  private addQueue(channelId: string): Observable<QueuedTrack[]> {
    return from(this.queuedTrackRepository.getQueue(channelId)).pipe(
      switchMap((queue) => {
        this.queues[channelId] = new BehaviorSubject(queue);
        return this.queues[channelId];
      })
    );
  }
}
