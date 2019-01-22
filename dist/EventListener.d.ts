declare type IHandler = (res?: any) => void;
interface IListener {
    event: string | number;
    handler: IHandler;
}
export default class EventListener {
    private _listeners;
    constructor();
    addListener(event: string | number, handler: IHandler): void;
    removeListener(event: string | number, handler: IHandler): void;
    addListeners(listeners: IListener[]): void;
    removeListeners(listeners: IListener[]): void;
    removeAllListeners(): void;
    emmit(event: any, res?: any): void;
}
export {};
