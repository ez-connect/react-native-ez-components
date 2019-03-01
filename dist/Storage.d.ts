declare type CryptHandler = (data: string) => string;
export declare class Storage {
    static save(key: string, item: object | string, excludes?: string[], encodeHandler?: CryptHandler): Promise<void>;
    static load(key: string, excludes?: string[], decodeHandler?: CryptHandler): Promise<any>;
    static setLogEnabled(value: boolean): void;
    private static _logEnabled?;
}
export {};
