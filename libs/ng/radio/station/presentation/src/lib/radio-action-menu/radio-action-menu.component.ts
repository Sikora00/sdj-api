import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'sdj-radio-action-menu',
  templateUrl: './radio-action-menu.component.html',
  styleUrls: ['./radio-action-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioActionMenuComponent {
  @Output()
  changeRadioStation = new EventEmitter<void>();

  onChangeRadioStation(): void {
    this.changeRadioStation.emit();
  }
}
