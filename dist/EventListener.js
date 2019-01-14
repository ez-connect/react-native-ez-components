export default class EventListener {
    constructor() {
        this._listeners = [];
    }
    addListener(event, handler) {
        this._listeners.push({ event, handler });
    }
    removeListener(event, handler) {
        const listener = this._listeners.find((x) => x.event === event && x.handler === handler);
        const index = this._listeners.indexOf(listener);
        if (index > -1) {
            this._listeners.splice(index, 1);
        }
    }
    removeAllListeners() {
        for (let i = 0; i < this._listeners.length; i++) {
            delete this._listeners[i];
        }
        this._listeners = [];
    }
    emmit(event, res) {
        const listeners = this._listeners.filter((x) => x.event === event && x.handler);
        for (const listener of listeners) {
            listener.handler(res);
        }
    }
}
