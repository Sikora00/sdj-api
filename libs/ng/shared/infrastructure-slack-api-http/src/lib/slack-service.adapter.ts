import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SlackService } from '@sdj/ng/shared/core/application-services';
import { SlackChannel } from '@sdj/shared/domain';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SlackServiceAdapter extends SlackService {
  readonly baseSlackUrl: string = 'https://slack.com/api/';
  readonly channelList: string =
    this.baseSlackUrl +
    'conversations.list?types=public_channel%2C%20private_channel&pretty=1';

  constructor(private http: HttpClient) {
    super();
  }

  getChannelList(): Observable<SlackChannel[]> {
    return this.http
      .get<any>(this.channelList)
      .pipe(map((response) => response.channels));
  }
}
