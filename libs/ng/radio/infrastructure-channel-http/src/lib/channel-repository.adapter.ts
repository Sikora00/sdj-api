import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChannelDataService } from '@sdj/ng/radio/core/application-services';
import { Channel } from '@sdj/ng/radio/core/domain';
import { environment } from '@sdj/ng/shared/core/domain';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ChannelRepositoryAdapter implements ChannelDataService {
  endpoints = {
    getChannels: `${environment.apiUrl}/channel`,
  };

  constructor(private http: HttpClient) {}

  getChannels(): Observable<Channel[]> {
    return this.http
      .get<{ channels: Channel[] }>(this.endpoints.getChannels)
      .pipe(map((res) => res.channels));
  }
}
