declare type IHandler = (res?: any) => void;
export default class EventListener {
    private _listeners;
    constructor();
    addListener(event: string, handler: IHandler): void;
    removeListener(event: string, handler: IHandler): void;
    removeAllListeners(): void;
    emmit(event: any, res?: any): void;
}
export {};
