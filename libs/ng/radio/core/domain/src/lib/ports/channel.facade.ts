import { Observable } from 'rxjs';
import { Channel } from '../entities/channel.entity';

export abstract class ChannelFacade {
  abstract channels$: Observable<Channel[]>;
  abstract selectedChannel$: Observable<Channel>;

  abstract loadChannels(): void;

  abstract selectFirstChannel(channelId: string | null): void;

  abstract selectChannel(channelId: string): void;
}
