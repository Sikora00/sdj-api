import { Injectable } from '@nestjs/common';
import { connectionConfig } from '@sdj/backend/shared/domain';
import { WebClient } from '@slack/client';
import { UserDataService } from './user-data.service';

@Injectable()
export class SlackUserDataService implements UserDataService {
  private readonly client = new WebClient(connectionConfig.slack.token);
  getUserData(id: string): Promise<any> {
    return this.client.users
      .info({
        user: id,
      })
      .then((userProfile) => userProfile.user);
  }
}
