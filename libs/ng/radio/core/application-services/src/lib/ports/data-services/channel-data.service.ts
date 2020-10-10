import { Channel } from '@sdj/ng/radio/core/domain';
import { Observable } from 'rxjs';

export abstract class ChannelDataService {
  abstract getChannels(): Observable<Channel[]>;
}
