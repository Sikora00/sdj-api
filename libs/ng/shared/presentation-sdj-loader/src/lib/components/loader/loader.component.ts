import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sdj-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {}
