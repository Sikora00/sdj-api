import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  Channel,
  ChannelRepositoryInterface,
} from '@sdj/backend/radio/core/domain';
import { ArrayUtil } from '@sdj/shared/utils';
import { GetChannelsQuery } from './get-channels.query';
import { GetChannelsReadModel } from './get-channels.read-model';

@QueryHandler(GetChannelsQuery)
export class GetChannelsHandler implements IQueryHandler<GetChannelsQuery> {
  constructor(private channelRepository: ChannelRepositoryInterface) {}

  async execute(query: GetChannelsQuery): Promise<GetChannelsReadModel> {
    let channels: Channel[];
    if (query.channelIds) {
      channels = await this.channelRepository.findByIds(query.channelIds);
    } else {
      channels = await this.channelRepository.findAll();
    }
    return ArrayUtil.arrayToMap(channels);
  }
}
