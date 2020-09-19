import { Player } from './player';
import { Scene } from './scene';
import { Tracker } from './tracker';

export class Controls {
  playing: boolean = false;
  private context: CanvasRenderingContext2D;
  private timeControl: Element;
  private playButton: HTMLButtonElement;
  private pauseButton: HTMLButtonElement;
  private soundButton: HTMLButtonElement;
  private prevSongButton: HTMLButtonElement;
  private nextSongButton: HTMLButtonElement;

  scene: Scene;
  player: Player;
  tracker: Tracker;

  init(scene: Scene): void {
    this.scene = scene;
    this.context = scene.context;
    this.initHandlers();
    this.timeControl = document.querySelector('.time');
  }

  initHandlers(): void {
    this.initPlayButton();
    this.initPauseButton();
    this.initSoundButton();
    this.initPrevSongButton();
    this.initNextSongButton();
    this.initTimeHandler();
  }

  initPlayButton(): void {
    this.playButton = document.querySelector('.play');
    this.playButton.addEventListener('mouseup', () => {
      this.playButton.style.display = 'none';
      this.pauseButton.style.display = 'inline-block';
      this.player.play();
      this.playing = true;
    });
  }

  initPauseButton(): void {
    this.pauseButton = document.querySelector('.pause');
    this.pauseButton.addEventListener('mouseup', () => {
      this.playButton.style.display = 'inline-block';
      this.pauseButton.style.display = 'none';
      this.player.pause();
      this.playing = false;
    });
  }

  initSoundButton(): void {
    this.soundButton = document.querySelector('.soundControl');
    this.soundButton.addEventListener('mouseup', () => {
      if (this.soundButton.classList.contains('disable')) {
        this.soundButton.classList.remove('disable');
        this.player.unmute();
      } else {
        this.soundButton.classList.add('disable');
        this.player.mute();
      }
    });
  }

  initPrevSongButton(): void {
    this.prevSongButton = document.querySelector('.prevSong');
    this.prevSongButton.addEventListener('mouseup', () => {
      this.player.prevTrack();
      if (this.playing) this.player.play();
    });
  }

  initNextSongButton(): void {
    this.nextSongButton = document.querySelector('.nextSong');
    this.nextSongButton.addEventListener('click', () => {
      this.player.nextTrack();
      if (this.playing) this.player.play();
    });
  }

  initTimeHandler(): void {
    setTimeout(() => {
      const rawTime = this.player.context.currentTime || 0;
      const secondsInMin = 60;
      let min = Math.floor(rawTime / secondsInMin).toString();
      let seconds = Math.floor(
        rawTime - parseInt(min, 10) * secondsInMin
      ).toString();
      if (parseInt(min, 10) < 10) {
        min = '0' + min;
      }
      if (parseInt(seconds, 10) < 10) {
        seconds = '0' + seconds;
      }
      this.timeControl.textContent = min + ':' + seconds;
      this.initTimeHandler();
    }, 300);
  }

  draw(): void {
    this.drawPic();
  }

  drawPic(): void {
    this.context.save();
    this.context.beginPath();
    this.context.fillStyle = 'rgba(254, 67, 101, 0.85)';
    this.context.lineWidth = 1;
    let x =
      this.tracker.r / Math.sqrt(Math.pow(Math.tan(this.tracker.angle), 2) + 1);
    let y = Math.sqrt(this.tracker.r * this.tracker.r - x * x);
    if (this.getQuadrant() === 2) {
      x = -x;
    }
    if (this.getQuadrant() === 3) {
      x = -x;
      y = -y;
    }
    if (this.getQuadrant() === 4) {
      y = -y;
    }
    this.context.arc(
      this.scene.radius + this.scene.padding + x,
      this.scene.radius + this.scene.padding + y,
      10,
      0,
      Math.PI * 2,
      false
    );
    this.context.fill();
    this.context.restore();
  }

  getQuadrant(): number {
    if (0 <= this.tracker.angle && this.tracker.angle < Math.PI / 2) {
      return 1;
    }
    if (Math.PI / 2 <= this.tracker.angle && this.tracker.angle < Math.PI) {
      return 2;
    }
    if (
      Math.PI < this.tracker.angle &&
      this.tracker.angle < (Math.PI * 3) / 2
    ) {
      return 3;
    }
    if (
      (Math.PI * 3) / 2 <= this.tracker.angle &&
      this.tracker.angle <= Math.PI * 2
    ) {
      return 4;
    }
  }
}
