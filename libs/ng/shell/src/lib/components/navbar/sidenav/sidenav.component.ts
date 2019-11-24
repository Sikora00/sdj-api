import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Channel } from '@sdj/ng/shared/domain';
import { Observable } from 'rxjs';

@Component({
  selector: 'sdj-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent {
  @Input()
  channels$: Observable<Channel[]>;
  @Input()
  selectedChannel: Channel;

  @Output()
  selectChannel: EventEmitter<Channel> = new EventEmitter<Channel>();

  onSelectChannel(channel: Channel): void {
    this.selectChannel.emit(channel);
  }
}
