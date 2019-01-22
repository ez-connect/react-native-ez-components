type IHandler = (res?: any) => void;

interface IListener {
  event: string|number;
  handler: IHandler;
}

export default class EventListener {
  private _listeners: IListener[];
  constructor() {
    this._listeners = [];
  }

  public addListener(event: string|number, handler: IHandler) {
    // console.debug(`EventListener.addListener: ${event}`);
    this._listeners.push({ event, handler });
  }

  public removeListener(event: string|number, handler: IHandler) {
    const listener = this._listeners.find((x) => x.event === event && x.handler === handler);
    const index = this._listeners.indexOf(listener);
    if (index > -1) {
      // console.debug(`EventListener.removeListener: ${event}`);
      this._listeners.splice(index, 1);
    }
  }

  public addListeners(listeners: IListener[]) {
    for (const listener of listeners) {
      this._listeners.push(listener);
    }
  }

  public removeListeners(listeners: IListener[]) {
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

  public emmit(event, res?: any) {
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
