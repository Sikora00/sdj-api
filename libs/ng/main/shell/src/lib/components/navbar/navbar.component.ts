import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'sdj-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Output()
  navigateToMostPlayed: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  navigateToRadio: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  toggleMenu: EventEmitter<void> = new EventEmitter<void>();

  onOpenMenu(): void {
    this.toggleMenu.emit();
  }

  onNavigateToRadio(): void {
    this.navigateToRadio.emit();
  }

  onNavigateToMostPlated(): void {
    this.navigateToMostPlayed.emit();
  }
}
