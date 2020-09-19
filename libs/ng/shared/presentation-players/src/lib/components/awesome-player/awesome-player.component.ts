import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ExternalRadio, QueuedTrack } from '@sdj/ng/radio/core/domain';
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
  styleUrls: [
    './awesome-player.component.scss',
    './awesome-player.component.mobile.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AwesomePlayerComponent
  implements OnInit, OnDestroy, AfterViewInit {
  get src(): string {
    return this._src;
  }

  @Input()
  set externalRadio(value: ExternalRadio | null) {
    if (this.player) {
      this.player.radio = value;
    }
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

  elementSize: number;
  isPlayerLoading$ = of(false);

  public player: Player;
  private framer: Framer;
  private scene: Scene;

  private _src: string;
  private _track: QueuedTrack;

  @HostListener('window:resize')
  onResize(): void {
    this.setElementSize();
  }

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnDestroy(): void {
    this.player.destroy();
    this.scene.stopRender();
  }

  ngOnInit(): void {
    this.setElementSize();
  }

  ngAfterViewInit(): void {
    this.framer = new Framer();
    const tracker = new Tracker();
    this.framer.tracker = tracker;
    const controls = new Controls();

    this.scene = new Scene(this.framer, tracker, controls);
    this.setElementSize();
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
    this.isPlayerLoading$ = this.player.isLoadingChange$.pipe(
      distinctUntilChanged(),
      switchMap(value => of(value).pipe(delay(500)))
    );
  }

  setElementSize(): void {
    this.elementSize =
      this.elementRef.nativeElement.offsetHeight <
      this.elementRef.nativeElement.offsetWidth
        ? this.elementRef.nativeElement.offsetHeight
        : this.elementRef.nativeElement.offsetWidth;
    if (this.scene) {
      this.scene.minSize = this.elementSize;
    }
  }
}
