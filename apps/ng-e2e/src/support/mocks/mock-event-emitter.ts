interface Events {
  [event: string]: Listener[];
}
type Listener = (...args: any[]) => void;

export class MockEventEmitter {
  private readonly events: Events = {};

  constructor() {
    this.events = {};
  }

  addEventListener = this.on.bind(this);

  on(event, listener): () => void {
    if (typeof this.events[event] !== 'object') {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return () => this.removeEventListener(event, listener);
  }

  removeEventListener(event, listener): void {
    if (typeof this.events[event] === 'object') {
      const idx = this.events[event].indexOf(listener);
      if (idx > -1) {
        this.events[event].splice(idx, 1);
      }
    }
  }

  emit(event: string, ...args: any[]): void {
    if (typeof this.events[event] === 'object') {
      this.events[event].forEach((listener) => listener.apply(this, args));
    }
  }

  once(event: string, listener: Listener): void {
    const remove = this.on(event, (...args) => {
      remove();
      listener();
    });
  }
}
