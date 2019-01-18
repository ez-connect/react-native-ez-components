export declare class Storage {
    static save(key: string, item: object, excludes?: string[]): Promise<void>;
    static load(key: any): Promise<any>;
}
