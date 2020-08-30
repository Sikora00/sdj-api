import { Observable } from 'rxjs';
import { Channel } from '../entities/channel.entity';

export abstract class ChannelRepository {
  abstract getChannels(): Observable<Channel[]>;
}
