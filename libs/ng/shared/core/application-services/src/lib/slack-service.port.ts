import { SlackChannel } from '@sdj/shared/domain';
import { Observable } from 'rxjs';

export abstract class SlackService {
  abstract getChannelList(): Observable<SlackChannel[]>;
}
