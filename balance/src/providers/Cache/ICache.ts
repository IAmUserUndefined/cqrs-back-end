/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ICache {
    set(key: string, value: any, expiryTime?: number): void;
    get(key: string): string;
    del(key: string): void;
}