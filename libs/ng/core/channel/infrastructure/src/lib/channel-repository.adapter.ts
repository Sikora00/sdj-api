import { Injectable } from '@angular/core';
import { Channel } from '@sdj/ng/core/channel/domain';
import { ChannelRepository } from '@sdj/ng/core/channel/domain-services';
import { SlackService } from '@sdj/ng/core/shared/port';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ChannelRepositoryAdapter extends ChannelRepository {
  constructor(private slackService: SlackService) {
    super();
  }

  getChannels(): Observable<Channel[]> {
    return this.slackService.getChannelList().pipe(
      map(slackChannels =>
        slackChannels.map(slackChannel => ({
          id: slackChannel.id,
          name: slackChannel.name,
          users: 0
        }))
      )
    );
  }
}