import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { QueuedTrack } from '@sdj/ng/shared/domain';
import { of } from 'rxjs';
import { delay, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Controls } from './controls';
import { Framer } from './framer';
import { Player } from './player';
import { Scene } from './scene';
import { Tracker } from './tracker';

@Component({
  selector: 'sdj-awesome-player',
  templateUrl: './awesome-player.component.html',
  styleUrls: ['./awesome-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AwesomePlayerComponent
  implements OnInit, OnDestroy, AfterViewInit {
  get src(): string {
    return this._src;
  }

  @Input()
  set src(value: string) {
    this._src = value;
    if (this.player) {
      this.player.src = value;
    }
  }

  get track(): QueuedTrack {
    return this._track;
  }

  @Input()
  set track(value: QueuedTrack) {
    this._track = value;
    if (this.player) {
      this.player.track = this.track;
    }
  }

  isPlayerLoading: boolean = false;

  public player: Player;
  private framer: Framer;
  private scene: Scene;

  private _src: string;
  private _track: QueuedTrack;

  constructor(private chD: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.player.destroy();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.framer = new Framer();
    const tracker = new Tracker();
    this.framer.tracker = tracker;
    const controls = new Controls();

    this.scene = new Scene(this.framer, tracker, controls);
    this.player = new Player(this.scene, this.framer);
    if (this.track) {
      this.player.track = this.track;
    }

    controls.player = this.player;
    controls.scene = this.scene;
    controls.tracker = tracker;

    tracker.player = this.player;

    this.player.init();
    this.player.src = this.src;
    this.player.isLoadingChange$
      .pipe(
        distinctUntilChanged(),
        switchMap(value => of(value).pipe(delay(500)))
      )
      .subscribe((isLoading: boolean) => {
        this.isPlayerLoading = isLoading;
        this.chD.markForCheck();
      });
  }
}
