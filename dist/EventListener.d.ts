declare type IHandler = (res?: any) => void;
export default class EventListener {
    private _listeners;
    constructor();
    addListener(event: string | number, handler: IHandler): void;
    removeListener(event: string | number, handler: IHandler): void;
    removeAllListeners(): void;
    emmit(event: any, res?: any): void;
}
export {};
