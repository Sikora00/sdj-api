import { Channel } from '@sdj/ng/core/radio/domain';
import { Observable } from 'rxjs';

export abstract class ChannelDataService {
  abstract getChannels(): Observable<Channel[]>;
}
