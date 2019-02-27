declare type Handler = (res?: any) => void;
interface Listener {
    event: string | number;
    handler: Handler;
}
export default class EventListener {
    private _listeners;
    constructor();
    addListener(event: string | number, handler: Handler): void;
    removeListener(event: string | number, handler: Handler): void;
    addListeners(listeners: Listener[]): void;
    removeListeners(listeners: Listener[]): void;
    removeAllListeners(): void;
    emmit(event: any, res?: any): void;
}
export {};
