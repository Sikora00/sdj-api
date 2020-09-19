import { Observable } from 'rxjs';

export abstract class RadioDataService {
  abstract getPlayDj(): Observable<void>;

  abstract getPlayRadio(): Observable<void>;
}
