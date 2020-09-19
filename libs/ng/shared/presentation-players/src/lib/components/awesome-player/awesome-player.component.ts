import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { of } from 'rxjs';
import { delay, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Circle } from './circle';
import { Player } from './player';
import { Scene } from './scene';
import { Ticks } from './ticks';

@Component({
  selector: 'sdj-awesome-player',
  templateUrl: './awesome-player.component.html',
  styleUrls: [
    './awesome-player.component.scss',
    './awesome-player.component.mobile.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AwesomePlayerComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @Input()
  title?: string;
  @Input()
  secondTitle: string;

  @Input()
  set src(value: string) {
    if (!value) {
      this.onPause();
    } else {
      this._src = value.toString();
      if (this.player) {
        this.player.src = this._src;
      }
    }
  }

  @Output()
  noAudioSource = new EventEmitter<void>();

  elementSize: number;
  isMuted = false;
  isPlayerLoading$ = of(false);
  isPlaying = false;

  public player: Player;
  private framer: Ticks;

  private scene: Scene;
  private _src: string;

  @HostListener('window:resize')
  onResize(): void {
    this.setElementSize();
  }

  constructor(
    private cdR: ChangeDetectorRef,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnDestroy(): void {
    this.player.destroy();
    this.scene.stopRender();
  }

  ngOnInit(): void {
    this.setElementSize();
  }

  async ngAfterViewInit(): Promise<void> {
    this.framer = new Ticks();
    const circle = new Circle();
    this.framer.circle = circle;

    this.scene = new Scene(this.framer, circle);
    this.setElementSize();
    this.player = new Player(this.scene, this.framer);

    this.player.init();
    this.player.src = this._src;
    this.isPlayerLoading$ = this.player.isLoadingChange$.pipe(
      distinctUntilChanged(),
      switchMap((value) => of(value).pipe(delay(500)))
    );
  }

  setElementSize(): void {
    const sizeBaseNode: HTMLElement = this.elementRef.nativeElement
      .children[0] as HTMLElement;
    this.elementSize = Math.min(
      sizeBaseNode.offsetHeight,
      sizeBaseNode.offsetWidth,
      740
    );
    if (this.scene) {
      this.scene.minSize = this.elementSize;
    }
  }

  onPlay(): void {
    if (this._src) {
      this.isPlaying = true;
      this.player.play();
    } else {
      this.noAudioSource.emit();
    }
  }

  onPause(): void {
    this.player?.pause();
    this.isPlaying = false;
  }

  toggleSound(): void {
    if (this.isMuted) {
      this.player.unmute();
    } else {
      this.player.mute();
    }
    this.isMuted = !this.isMuted;
  }
}
