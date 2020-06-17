type Handler = (res?: any) => void;

interface Listener<T> {
  event: T;
  handler: Handler;
}

export class EventListener<T> {
  private _listeners: Listener<T>[] = [];

  public addListener(event: T, handler: Handler) {
    // console.debug(`EventListener.addListener: ${event}`);
    this._listeners.push({ event, handler });
  }

  public removeListener(event: T, handler: Handler) {
    const listener = this._listeners.find((x) => x.event === event && x.handler === handler);
    const index = this._listeners.indexOf(listener);
    if (index > -1) {
      // console.debug(`EventListener.removeListener: ${event}`);
      this._listeners.splice(index, 1);
    }
  }

  public addListeners(listeners: Listener<T>[]) {
    for (const listener of listeners) {
      this._listeners.push(listener);
    }
  }

  public removeListeners(listeners: Listener<T>[]) {
    for (const listener of listeners) {
      this.removeListener(listener.event, listener.handler);
    }
  }

  public removeAllListeners() {
    for (let i = 0; i < this._listeners.length; i++) {
      delete this._listeners[i];
    }

    this._listeners = [];
  }

  public emit(event: T, res?: any) {
    // FIXME: some listener without `handler`, don't know why?
    const listeners = this._listeners.filter((x) => x.event === event);
    for (const listener of listeners) {
      if (listener.handler) {
        listener.handler(res);
      } else {
        const index = this._listeners.indexOf(listener);
        this._listeners.splice(index, 1);
        console.warn(`Invalid hander of event ${event}`);
      }
    }
  }
}
