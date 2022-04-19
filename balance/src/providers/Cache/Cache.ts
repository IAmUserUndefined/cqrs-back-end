/* eslint-disable @typescript-eslint/no-explicit-any */

import NodeCache from "node-cache";
import { ICache } from "./ICache";

const cache = new NodeCache();

export const Cache: ICache = class Cache {

	static set(key: string, value: any, expiryTime?: number): void {
		cache.set(key, value, expiryTime);
	}

	static get(key: string): string {
		return cache.get(key);
	}
    
	static del(key: string): void {
		cache.del(key);
	}
};