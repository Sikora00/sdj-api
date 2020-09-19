import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  ExternalRadioFacade,
  QueuedTrackFacade,
  RadioFacade
} from '@sdj/ng/radio/core/application-services';
import {
  Channel,
  ChannelFacade,
  ExternalRadio,
  QueuedTrack,
  Track
} from '@sdj/ng/radio/core/domain';
import { WebSocketClient } from '@sdj/ng/shared/core/application-services';
import { RadioStationsComponent } from '@sdj/ng/radio/station/presentation';
import { AwesomePlayerComponent } from '@sdj/ng/shared/presentation-players';
import { User, WebSocketEvents } from '@sdj/shared/domain';
import { TrackUtil, UserUtils } from '@sdj/shared/utils';
import { merge, Observable, of, Subject } from 'rxjs';
import { filter, first, map, takeUntil, tap } from 'rxjs/operators';
import { RadioPresenter } from './radio.presenter';

@UntilDestroy()
@Component({
  selector: 'sdj-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss', './radio.component.mobile.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RadioPresenter]
})
export class RadioComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('playerComponent')
  playerComponent: AwesomePlayerComponent;
  @ViewChild('toPlay')
  toPlayContainer: ElementRef<HTMLElement>;

  audioSrc$: Observable<string> = this.radioFacade.audioSource$;
  currentTrack$ = this.queuedTrackFacade.currentTrack$;
  selectedExternalRadio$ = this.externalRadioFacade.selectedExternalRadio$;
  getThumbnail: (track: Track) => string = TrackUtil.getTrackThumbnail;
  getUserName: (user: User) => string = UserUtils.getUserName;
  listScrollSubject: Subject<QueuedTrack[]> = new Subject();
  queuedTracks: QueuedTrack[];
  queuedTracks$: Observable<QueuedTrack[]> = of([]);
  readonly queuedTracksWidth: number = 210;
  selectedChannel: Channel;

  private selectedChannelUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private channelFacade: ChannelFacade,
    private chD: ChangeDetectorRef,
    private dialog: MatDialog,
    private externalRadioFacade: ExternalRadioFacade,
    private queuedTrackFacade: QueuedTrackFacade,
    private radioFacade: RadioFacade,
    private radioPresenter: RadioPresenter,
    private webSocket: WebSocketClient
  ) {}

  @HostListener('window:unload')
  unloadHandler(): void {
    this.leaveChannel();
  }

  ngOnDestroy(): void {
    this.leaveChannel();
    this.radioFacade.stopListeningForPozdro();
  }

  ngOnInit(): void {
    this.radioFacade.startListeningForPozdro();
    this.handleReconnection();
  }

  ngAfterViewInit(): void {
    this.handleSpeeching();
    this.handleSelectedChannelChange();
  }

  onChangeRadioStation(): void {
    this.externalRadioFacade.externalRadioGroups$
      .pipe(first())
      .subscribe(externalRadioGroups => {
        this.dialog
          .open(RadioStationsComponent, {
            data: { externalRadioGroups },
            panelClass: 'radio-stations-dialog'
          })
          .afterClosed()
          .pipe(filter<ExternalRadio>(Boolean))
          .subscribe(result => {
            this.externalRadioFacade.select(result);
          });
      });
  }

  handleQueuedTrackList(): void {
    this.queuedTrackFacade.loadQueuedTracks(this.selectedChannel.id);
    const queuedTracks$ = this.queuedTrackFacade.queuedTracks$.pipe(
      takeUntil(this.selectedChannelUnsubscribe)
    );
    const trackWillBePlayed$ = queuedTracks$.pipe(
      map(list => list.slice(1)),
      filter(
        newList =>
          this.queuedTracks && newList.length < this.queuedTracks.length
      ),
      tap(list => this.handleScrollList(list))
    );
    trackWillBePlayed$.subscribe();

    const newTrackAddedToQueue$ = queuedTracks$.pipe(
      map(list => list.slice(1)),
      filter(
        newList =>
          !this.queuedTracks || newList.length >= this.queuedTracks.length
      )
    );
    this.queuedTracks$ = merge(
      this.listScrollSubject,
      newTrackAddedToQueue$
    ).pipe(takeUntil(this.selectedChannelUnsubscribe));

    this.queuedTracks$.subscribe(list => {
      this.queuedTracks = list;
      const listElement = this.toPlayContainer.nativeElement;
      setTimeout(() => {
        listElement.scrollLeft +=
          listElement.scrollWidth - listElement.clientWidth;
      });
    });
  }

  handleScrollList(newList: QueuedTrack[]): void {
    if (this.queuedTracks && newList.length < this.queuedTracks.length) {
      let scrollAmount = 0;
      const slideTimer: any = setInterval(() => {
        this.toPlayContainer.nativeElement.scrollLeft -= 10;
        scrollAmount += 10;
        if (scrollAmount >= this.queuedTracksWidth) {
          this.listScrollSubject.next(newList);
          window.clearInterval(slideTimer);
        }
      }, 25);
    } else {
      this.listScrollSubject.next(newList);
    }
  }

  handleSelectedChannelChange(): void {
    this.channelFacade.selectedChannel$
      .pipe(
        filter<Channel>(Boolean),
        filter(
          channel =>
            !this.selectedChannel || channel.id !== this.selectedChannel.id
        ),
        untilDestroyed(this)
      )
      .subscribe((channel: Channel) => {
        this.selectedChannel = channel;
        this.selectedChannelUnsubscribe = this.radioPresenter.recreateSubject(
          this.selectedChannelUnsubscribe
        );
        this.handleQueuedTrackList();
        this.radioFacade.join(channel);
        this.chD.markForCheck();
      });
  }

  handleSpeeching(): void {
    this.radioFacade.speeching$.subscribe((speeching: boolean) => {
      if (speeching) {
        this.playerComponent.player.audio.volume = 0.1;
      } else {
        this.playerComponent.player.audio.volume = 1;
      }
    });
  }

  leaveChannel(): void {
    this.radioFacade.leaveChannel(this.selectedChannel);
  }

  private handleReconnection(): void {
    this.webSocket
      .observe(WebSocketEvents.reconnect)
      .pipe(
        filter(() => Boolean(this.selectedChannel)),
        untilDestroyed(this)
      )
      .subscribe(() => this.radioFacade.join(this.selectedChannel));
  }
}
