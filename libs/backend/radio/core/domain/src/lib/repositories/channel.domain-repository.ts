import { Channel } from '../entities/channel.entity';

export abstract class ChannelDomainRepository {
  abstract findById(channelId: string): Promise<Channel | undefined>;

  abstract findAll(): Promise<Channel[]>;

  abstract findByIds(channelIds: string[]): Promise<Channel[]>;

  abstract async findOne(channelId: string): Promise<Channel>;

  abstract async findOrCreate(channelId: string): Promise<Channel>;

  abstract findOrFail(channelId: string): Promise<Channel>;

  abstract async save(channel: Channel): Promise<Channel>;
}
