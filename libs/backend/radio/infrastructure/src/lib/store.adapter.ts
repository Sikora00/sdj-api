import { Injectable } from '@nestjs/common';
import { Store } from '@sdj/backend/radio/core/application-services';
import {
  QueuedTrack,
  QueuedTrackDomainRepository,
} from '@sdj/backend/radio/core/domain';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, first, map } from 'rxjs/operators';

interface ChannelState {
  silenceCount: number;
  queue: QueuedTrack[];
  currentTrack: QueuedTrack | null;
}

interface State {
  [key: string]: ChannelState;
}

const initialChannelState = { silenceCount: 0, queue: [], currentTrack: null };
const initialPlaylistState = {};

@Injectable()
export class StoreAdapter extends Store {
  get state(): State {
    return this._state.getValue();
  }

  private _state: BehaviorSubject<State> = new BehaviorSubject(
    initialPlaylistState
  );

  constructor(
    private readonly queuedTrackRepository: QueuedTrackDomainRepository
  ) {
    super();
  }

  async addToQueue(queuedTrack: QueuedTrack): Promise<void> {
    const channelState = await this.getChannelState(queuedTrack.playedIn.id);
    const isTrackAlreadyInQueue =
      channelState.queue.findIndex(
        (trackInQueue: QueuedTrack) => trackInQueue.id === queuedTrack.id
      ) !== -1;
    if (!isTrackAlreadyInQueue) {
      this._state.next({
        ...this.state,
        [queuedTrack.playedIn.id]: {
          ...channelState,
          queue: channelState.queue.concat(queuedTrack),
        },
      });
    }
  }

  channelAppears(channelId: string): Promise<unknown> {
    return (!!this.state && !!this.state[channelId]
      ? of()
      : this._state.pipe(
          filter((state) => !!state[channelId]),
          first()
        )
    ).toPromise();
  }

  channelDisappears(channelId: string): void {
    const state = this.state;
    delete state[channelId];
    this._state.next(state);
  }

  async getCurrentTrack(channelId: string): Promise<QueuedTrack | null> {
    return (await this.getChannelState(channelId)).currentTrack;
  }

  getQueue(channelId: string): Observable<QueuedTrack[]> {
    return this._state.pipe(
      map((state: State) => state[channelId]),
      filter(Boolean),
      map((state: ChannelState) => state.queue),
      distinctUntilChanged()
    );
  }

  async getSilenceCount(channelId: string): Promise<number> {
    await this.getChannelState(channelId);
    return this.state[channelId].silenceCount;
  }

  isChannelActive(channelId: string): boolean {
    return !!this.state[channelId];
  }

  async setCurrentTrack(
    channelId: string,
    queuedTrack: QueuedTrack | null
  ): Promise<void> {
    const channelState = await this.getChannelState(channelId);
    this._state.next({
      ...this.state,
      [channelId]: { ...channelState, currentTrack: queuedTrack },
    });
  }

  async setSilenceCount(channelId: string, value: number): Promise<void> {
    const channelState = await this.getChannelState(channelId);
    this._state.next({
      ...this.state,
      [channelId]: { ...channelState, silenceCount: value },
    });
  }

  async removeFromQueue(queuedTrack: QueuedTrack): Promise<void> {
    const channelState = await this.getChannelState(queuedTrack.playedIn.id);
    this._state.next({
      ...this.state,
      [queuedTrack.playedIn.id]: {
        ...channelState,
        queue: channelState.queue.filter(
          (qTrack) => qTrack.id !== queuedTrack.id
        ),
      },
    });
  }

  private async getChannelState(channelId: string): Promise<ChannelState> {
    if (!this.state[channelId]) {
      this.state[channelId] = {
        ...initialChannelState,
        queue: await this.queuedTrackRepository.findQueuedTracks(channelId),
      };
    }
    return this.state[channelId];
  }
}
