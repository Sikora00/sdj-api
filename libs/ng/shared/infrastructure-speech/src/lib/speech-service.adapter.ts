import { Injectable } from '@angular/core';
import { SpeechService } from '@sdj/ng/shared/core/application-services';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class SpeechServiceAdapter extends SpeechService {
  speeching$: Subject<boolean> = new BehaviorSubject(false);

  private synth: SpeechSynthesis;
  private voice: SpeechSynthesisVoice;

  private lang: string = 'pl-PL';
  private pitch: number = 1;
  private rate: number = 1;

  constructor() {
    super();
    this.init();
  }

  private init(): void {
    new Promise((resolve) => (window.speechSynthesis.onvoiceschanged = resolve))
      .then(() => {
        this.synth = window.speechSynthesis;
        this.voice = this.synth
          .getVoices()
          .find((voice) => voice.lang === this.lang);
      })
      .catch(() => {
        // tslint:disable-next-line: no-console
        console.error(`Browser doesn't support speechSynthesis`);
      });
  }

  speak(text: string): void {
    this.speeching$.next(true);

    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.onend = (event) => {
      event.preventDefault();
      this.speeching$.next(false);
    };
    utterThis.voice = this.voice;
    utterThis.pitch = this.pitch;
    utterThis.rate = this.rate;
    this.synth.speak(utterThis);
  }
}
