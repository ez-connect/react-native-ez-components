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
    addListeners(listeners) {
        for (const listener of listeners) {
            this._listeners.push(listener);
        }
    }
    removeListeners(listeners) {
        for (const listener of listeners) {
            this.removeListener(listener.event, listener.handler);
        }
    }
    removeAllListeners() {
        for (let i = 0; i < this._listeners.length; i++) {
            delete this._listeners[i];
        }
        this._listeners = [];
    }
    emmit(event, res) {
        const listeners = this._listeners.filter((x) => x.event === event);
        for (const listener of listeners) {
            if (listener.handler) {
                listener.handler(res);
            }
            else {
                const index = this._listeners.indexOf(listener);
                this._listeners.splice(index, 1);
                console.warn(`Invalid hander of event ${event}`);
            }
        }
    }
}
