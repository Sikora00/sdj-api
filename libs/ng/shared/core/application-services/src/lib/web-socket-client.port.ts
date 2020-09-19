import { Observable, Subject } from 'rxjs';

export abstract class WebSocketClient {
  abstract createSubject<T>(event: string): Subject<T>;

  abstract emit(event: string, data: any): void;

  abstract observe<T>(event: string): Observable<T>;
}
