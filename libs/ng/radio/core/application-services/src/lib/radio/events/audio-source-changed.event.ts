import { Action } from '@ngrx/store';

export class AudioSourceChangedEvent implements Action {
  static type = '[Radio] Audio Source Changed';
  type = AudioSourceChangedEvent.type;

  constructor(public source: string) {}
}
