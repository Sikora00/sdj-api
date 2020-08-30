import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChannelDataService } from '@sdj/ng/core/radio/application-services';
import { Channel } from '@sdj/ng/core/radio/domain';
import { SlackService } from '@sdj/ng/core/shared/application-services';
import { environment } from '@sdj/ng/core/shared/domain';
import { ArrayUtil } from '@sdj/shared/utils';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class ChannelRepositoryAdapter extends ChannelDataService {
  endpoints = {
    getChannels: `${environment.apiUrl}/channel`
  };

  constructor(private http: HttpClient, private slackService: SlackService) {
    super();
  }

  getChannels(): Observable<Channel[]> {
    return this.slackService.getChannelList().pipe(
      map(slackChannels =>
        ArrayUtil.arrayToMap(
          slackChannels.map(slackChannel => ({
            id: slackChannel.id,
            name: slackChannel.name
          }))
        )
      ),
      switchMap(slackChannels => {
        const params = Object.keys(slackChannels).reduce(
          (p, id) => p.append('channelIds[]', id),
          new HttpParams()
        );
        return this.http
          .get<Channel[]>(this.endpoints.getChannels, { params })
          .pipe(
            map(channels =>
              Object.keys(slackChannels).map(id => {
                const channel = channels[id];
                const slackChannel = slackChannels[id];
                return {
                  id,
                  defaultStreamUrl: channel?.defaultStreamUrl,
                  name: slackChannel.name,
                  usersOnline: channel ? channel.usersOnline : 0
                };
              })
            )
          );
      })
    );
  }
}
