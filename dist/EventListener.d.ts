declare type Handler = (res?: any) => void;
interface Listener<T> {
    event: T;
    handler: Handler;
}
export default class EventListener<T> {
    private _listeners;
    addListener(event: T, handler: Handler): void;
    removeListener(event: T, handler: Handler): void;
    addListeners(listeners: Array<Listener<T>>): void;
    removeListeners(listeners: Array<Listener<T>>): void;
    removeAllListeners(): void;
    emit(event: T, res?: any): void;
}
export {};
