import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Channel,
  ChannelDomainRepository,
} from '@sdj/backend/radio/core/domain';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelRepositoryAdapter extends ChannelDomainRepository {
  constructor(
    @InjectRepository(Channel)
    private typeOrmRepository: Repository<Channel>
  ) {
    super();
  }

  findById(channelId: string): Promise<Channel | undefined> {
    return this.typeOrmRepository.findOne(channelId);
  }

  findAll(): Promise<Channel[]> {
    return this.typeOrmRepository.find();
  }

  findByIds(channelIds: string[]): Promise<Channel[]> {
    return this.typeOrmRepository.findByIds(channelIds);
  }

  async findOne(channelId: string): Promise<Channel | undefined> {
    return this.typeOrmRepository.findOne(channelId);
  }

  async findOrCreate(channelId: string): Promise<Channel> {
    let channel = await this.typeOrmRepository.findOne(channelId);
    if (!channel) {
      channel = new Channel(channelId);
      channel = await this.save(channel);
    }
    return channel;
  }

  findOrFail(channelId: string): Promise<Channel> {
    return this.typeOrmRepository.findOneOrFail(channelId);
  }

  save(channel: Channel): Promise<Channel> {
    return this.typeOrmRepository.save(channel);
  }
}
