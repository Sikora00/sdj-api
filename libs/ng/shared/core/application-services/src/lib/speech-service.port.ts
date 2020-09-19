import { Observable } from 'rxjs';

export abstract class SpeechService {
  speeching$: Observable<boolean>;
  abstract speak(text: string): void;
}
