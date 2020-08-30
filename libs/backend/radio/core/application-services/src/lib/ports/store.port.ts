import { QueuedTrack } from '@sdj/backend/radio/core/domain';
import { Observable } from 'rxjs';

export abstract class Store {
  abstract async addToQueue(queuedTrack: QueuedTrack): Promise<void>;

  abstract channelAppears(channelId: string): Promise<unknown>;

  abstract channelDisappears(channelId: string): void;

  abstract async getCurrentTrack(
    channelId: string
  ): Promise<QueuedTrack | null>;

  abstract getQueue(channelId: string): Observable<QueuedTrack[]>;

  abstract async getSilenceCount(channelId: string): Promise<number>;

  abstract isChannelActive(channelId: string): boolean;

  abstract async removeFromQueue(queuedTrack: QueuedTrack): Promise<void>;

  abstract async setCurrentTrack(
    channelId: string,
    queuedTrack: QueuedTrack | null
  ): Promise<void>;

  abstract async setSilenceCount(
    channelId: string,
    value: number
  ): Promise<void>;
}
