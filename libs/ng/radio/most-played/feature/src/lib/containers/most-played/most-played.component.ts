import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Channel, ChannelFacade, Track } from '@sdj/ng/radio/core/domain';
import { environment } from '@sdj/ng/shared/core/domain';
import { Track as MatTrack } from 'ngx-audio-player';
import { filter, map } from 'rxjs/operators';
import { MostPlayedTracksFacade } from '../../application/most-played-tracks.facade';

@UntilDestroy()
@Component({
  selector: 'sdj-most-played',
  templateUrl: './most-played.component.html',
  styleUrls: ['./most-played.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MostPlayedComponent implements OnInit, OnDestroy {
  channel: Channel;
  loading$ = this.trackFacade.mostPlayedTracksLoading$;
  tracks$ = this.trackFacade.mostPlayedTracks$.pipe(
    filter(Boolean),
    map<Track[], MatTrack[]>((tracks) =>
      tracks.map((track) => ({
        title: `${track.title}. Played ${track.playedCount} times`,
        link: environment.backendUrl + 'tracks/' + track.id + '.mp3',
      }))
    )
  );

  constructor(
    private chD: ChangeDetectorRef,
    private channelFacade: ChannelFacade,
    private trackFacade: MostPlayedTracksFacade
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.handleSelectedChannelChange();
  }

  handleSelectedChannelChange(): void {
    this.channelFacade.selectedChannel$
      .pipe(untilDestroyed(this))
      .subscribe((channel: Channel) => {
        this.channel = channel;
        this.trackFacade.loadMostPlayedTracks(channel.id);
      });
  }
}
