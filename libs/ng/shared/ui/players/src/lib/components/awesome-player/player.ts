import { environment } from "@ng-environment/environment.prod";
import { QueuedTrack } from "@sdj/shared/common";
import { UserUtils } from "@sdj/shared/utils";
import { untilDestroyed } from "ngx-take-until-destroy";
import { Observable } from "rxjs";

import { Framer } from "./framer";
import { Scene } from "./scene";

export class Player {
  get src(): string {
    return this._src;
  }

  set src(value: string) {
    if (value !== this.src) {
      this._src = value;
      this.audio.src = value;
      this.audio.load();
      if (this.context.state === 'running') {
        this.audio.play();
      }
    }
  }

  get track(): Observable<any> {
    return this._track;
  }

  set track(value: Observable<any>) {
    this._track = value;
    this.handleTrackChange();
  }

  public audio: HTMLAudioElement;
  public context: AudioContext;

  private analyser: AnalyserNode;
  private destination: AudioDestinationNode;
  private gainNode: GainNode;
  private javascriptNode: ScriptProcessorNode;
  private source: MediaElementAudioSourceNode;
  private _src: string;
  private _track: Observable<any>;

  constructor(private scene: Scene, private framer: Framer) {}

  destroy(): void {
    this.audio.remove();
  }

  init(): void {
    (<any>window).AudioContext =
      (<any>window).AudioContext || (<any>window).webkitAudioContext;
    this.context = new AudioContext();
    if (this.context.suspend) {
      this.context.suspend();
    }
    try {
      this.javascriptNode = this.context.createScriptProcessor(2048, 1, 1);
      this.javascriptNode.connect(this.context.destination);
      this.analyser = this.context.createAnalyser();
      this.analyser.connect(this.javascriptNode);
      this.analyser.smoothingTimeConstant = 0.6;
      this.analyser.fftSize = 2048;
      this.audio = <HTMLAudioElement>document.getElementById('playerHtmlAudio');
      this.audio.src = environment.radioStreamUrl;
      this.audio.crossOrigin = 'anonymous';
      this.audio.load();
      this.audio.addEventListener('error', () => {
        setTimeout(() => {
          this.audio.load();
          if (this.context.state === 'running') {
            this.audio.play();
          }
        }, 1000);
      });
      this.source = this.context.createMediaElementSource(this.audio);
      this.destination = this.context.destination;

      this.gainNode = this.context.createGain();
      this.source.connect(this.gainNode);
      this.gainNode.connect(this.analyser);
      this.gainNode.connect(this.destination);

      this.initHandlers();
    } finally {
      this.framer.setLoadingPercent(1);
    }
    this.scene.init();
  }

  handleTrackChange(): void {
    this._track
      .pipe(untilDestroyed(this, 'destroy'))
      .subscribe((track: QueuedTrack | undefined) => {
        const convertedTrack = {
          artist:
            track && track.addedBy
              ? UserUtils.getUserName(track.addedBy)
              : 'DJ PAWEŁ',
          song: track ? track.track.title : 'OPEN FM'
        };
        document.querySelector('.song .artist').textContent =
          convertedTrack.artist;
        document.querySelector('.song .name').textContent = convertedTrack.song;
        // this.currentSongIndex = index;
      });
  }

  nextTrack(): void {
    // ++this.currentSongIndex;
    // if (this.currentSongIndex == this.tracks.length) {
    //     this.currentSongIndex = 0;
    // }
    // this.source.stop();
    // this.source = this.context.createBufferSource();
    // this.source.connect(this.gainNode);
    // this.loadTrack(this.currentSongIndex);
    // this.source.start();
  }

  prevTrack(): void {
    //   --this.currentSongIndex;
    //   if (this.currentSongIndex == -1) {
    //     this.currentSongIndex = this.tracks.length - 1;
    //   }
    //
    //   this.source.stop();
    //   this.source = this.context.createBufferSource();
    //   this.source.connect(this.gainNode);
    //   this.loadTrack(this.currentSongIndex);
    //   this.source.start();
  }

  //
  play(): void {
    if (this.context.resume) {
      this.context.resume();
    }
    this.audio.load();
    this.audio.play();
  }

  stop(): void {
    this.audio.pause();
    this.context.suspend();
  }

  pause(): void {
    if (this.context.suspend) {
      this.context.suspend();
    }
    this.audio.pause();
  }

  mute(): void {
    this.gainNode.gain.value = 0;
  }

  unmute(): void {
    this.gainNode.gain.value = 1;
  }

  initHandlers(): void {
    this.javascriptNode.onaudioprocess = () => {
      this.framer.frequencyData = new Uint8Array(
        this.analyser.frequencyBinCount
      );
      this.analyser.getByteFrequencyData(this.framer.frequencyData);
    };
  }
}
