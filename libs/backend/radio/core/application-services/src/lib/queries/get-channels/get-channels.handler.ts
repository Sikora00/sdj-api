import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  Channel,
  ChannelRepositoryInterface,
} from '@sdj/backend/radio/core/domain';
import { SlackApiService } from '@sdj/shared/domain';
import { GetChannelsQuery } from './get-channels.query';
import { GetChannelsReadModel } from './get-channels.read-model';

@QueryHandler(GetChannelsQuery)
export class GetChannelsHandler implements IQueryHandler<GetChannelsQuery> {
  constructor(
    private channelRepository: ChannelRepositoryInterface,
    private slackApi: SlackApiService
  ) {}

  async execute(query: GetChannelsQuery): Promise<GetChannelsReadModel> {
    const channels: Channel[] = [];
    const userChannels = await this.slackApi.getChannelList(query.token);
    for (const slackChannel of userChannels) {
      let channel = await this.channelRepository.findById(slackChannel.id);
      if (!channel) {
        channel = await this.channelRepository.save(
          Channel.create(slackChannel.id, slackChannel.name)
        );
      }
      channels.push(channel);
    }
    return { channels };
  }
}
