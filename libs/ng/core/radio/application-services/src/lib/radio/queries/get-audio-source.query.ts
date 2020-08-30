import { Action } from '@ngrx/store';

export class GetAudioSourceQuery implements Action {
  static type = '[Radio] Get Audio Source';
  type = GetAudioSourceQuery.type;
}
