import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class RadioPresenter {
  recreateSubject(subject: Subject<void>): Subject<void> {
    subject.next();
    subject.complete();
    return new Subject();
  }
}
