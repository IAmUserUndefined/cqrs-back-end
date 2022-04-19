/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IRedis {
    get(key: string): Promise<number>;
    set(key: string, value: any): void;
    del(key: string): void;
}