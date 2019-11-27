import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'sdj-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
