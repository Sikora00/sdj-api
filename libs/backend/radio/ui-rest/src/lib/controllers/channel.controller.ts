import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard, RequestWithUser } from '@sdj/backend/auth/api';
import {
  GetChannelsQuery,
  GetChannelsReadModel,
  RadioFacade,
} from '@sdj/backend/radio/core/application-services';

@Controller('channel')
export class ChannelController {
  constructor(private radioFacade: RadioFacade) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  getChannels(@Req() request: RequestWithUser): Promise<GetChannelsReadModel> {
    return this.radioFacade.getChannels(
      new GetChannelsQuery(request.user.token)
    );
  }
}
