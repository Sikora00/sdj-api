import { Injectable } from '@angular/core';
import { environment } from '@sdj/ng/core/shared/domain';
import { WebSocketClient } from '@sdj/ng/core/shared/port';
import { WebSocketEvents } from '@sdj/shared/domain';
import { fromEvent, Observable, Observer, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal-compatibility';
import * as socketIo from 'socket.io-client';
import Socket = SocketIOClient.Socket;

@Injectable({
  providedIn: 'root'
})
export class WebSocketClientAdapter extends WebSocketClient {
  private readonly socket: Socket;

  constructor() {
    super();
    const io = window.io || socketIo;
    this.socket = io(environment.backendUrl);
  }

  createSubject<T>(event: string): Subject<T> {
    const observable = fromEvent<T>(this.socket, event);

    const observer: Observer<T> = {
      next: (data: Object) => {
        this.socket.emit(event, JSON.stringify(data));
      },
      error: () => {},
      complete: () => {}
    };

    return new AnonymousSubject<T>(observer, observable);
  }

  emit(event: WebSocketEvents, data: any): void {
    this.socket.emit(event, JSON.stringify(data));
  }

  observe<T>(event: WebSocketEvents): Observable<T> {
    return fromEvent<T>(this.socket, event);
  }
}
