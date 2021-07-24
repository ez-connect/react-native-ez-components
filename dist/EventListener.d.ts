declare type Handler = (res?: any) => void;
interface Listener<T> {
    event: T;
    handler: Handler;
}
export declare class EventListener<T> {
    private _listeners;
    addListener(event: T, handler: Handler): void;
    removeListener(event: T, handler: Handler): void;
    addListeners(listeners: Listener<T>[]): void;
    removeListeners(listeners: Listener<T>[]): void;
    removeAllListeners(): void;
    emit(event: T, res?: any): void;
}
export {};
