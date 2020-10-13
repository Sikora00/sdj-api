import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChannelPersistenceService } from '@sdj/ng/radio/core/application-services';
import { Channel } from '@sdj/ng/radio/core/domain';
import { Observable, of } from 'rxjs';
import { fromChannelActions } from './channel.actions';

@Injectable()
export class NgrxEntityChannelPersistenceService
  implements ChannelPersistenceService {
  constructor(private store: Store) {}
  save(channels: Channel[]): Observable<void> {
    return of(
      this.store.dispatch(fromChannelActions.upsertChannels({ channels }))
    );
  }
}
