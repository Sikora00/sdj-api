import { Injectable } from '@angular/core';
import { Track } from '@sdj/shared/common';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TrackApiService {
  loadMostPlayedTracks(channelId: string): Observable<Track[]> {
    return;
  }
}