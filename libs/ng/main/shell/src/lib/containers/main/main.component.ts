import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Channel, ChannelFacade } from '@sdj/ng/radio/core/domain';

@Component({
  selector: 'sdj-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  @ViewChild('sidenav', { static: true })
  sidenav: MatSidenav;

  channels$ = this.channelFacade.channels$;
  selectedChannel: Channel;

  constructor(
    private channelFacade: ChannelFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.handleSelectedChannelChange();
  }

  handleSelectedChannelChange(): void {
    this.channelFacade.selectedChannel$.subscribe((channel: Channel) => {
      this.navigateToChannel(channel);
      this.selectedChannel = channel;
    });
  }

  onNavigateToRadio(): void {
    this.router.navigate([this.selectedChannel.id]);
  }

  onToggleMenu(): void {
    this.sidenav.toggle();
  }

  onSelectChannel(channel: Channel): void {
    this.channelFacade.selectChannel(channel.id);
  }

  onNavigateToMostPlayed(): void {
    this.router.navigate([this.selectedChannel.id, 'most-played']);
  }

  private navigateToChannel(channel: Channel): void {
    const oldChannel = this.selectedChannel;
    if (oldChannel && this.router.url.includes(oldChannel.id)) {
      this.router.navigateByUrl(
        this.router.url.replace(oldChannel.id, channel.id)
      );
    } else if (this.router.url.includes(channel.id)) {
      return;
    } else {
      this.router.navigate([channel.id]);
    }
  }
}
