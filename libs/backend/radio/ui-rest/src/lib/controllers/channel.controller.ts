import { Controller, Get, Query } from '@nestjs/common';
import {
  GetChannelsQuery,
  GetChannelsReadModel,
  RadioFacade,
} from '@sdj/backend/radio/core/application-services';

@Controller('channel')
export class ChannelController {
  constructor(private radioFacade: RadioFacade) {}

  @Get()
  getChannels(
    @Query('channelIds') channelIds: string[]
  ): Promise<GetChannelsReadModel> {
    return this.radioFacade.getChannels(new GetChannelsQuery(channelIds));
  }
}
