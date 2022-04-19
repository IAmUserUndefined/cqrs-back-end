/* eslint-disable @typescript-eslint/no-explicit-any */

import { IRedis } from "./IRedis";
import IORedis from "ioredis";
import Helper from "../../utils/helper/Helper";

export class Redis implements IRedis {
    
	redis: IORedis;

	constructor() {
		this.redis = new IORedis({
			host: Helper.getRedisHostEnvironmentVariable(),
			port: parseInt(Helper.getRedisPortEnvironmentVariable()),
			lazyConnect: true,
		});
	}

	async getConnection(): Promise<boolean> {
		return this.redis.hello()
			.then(() => true)
			.catch((e) => {
				console.log(e);
				return false;
			});
	}

	async get(key: string): Promise<number> {
		const value = await this.redis.get(key);
		return value ? JSON.parse(value) : null;
	}

	set(key: string, value: any): void {
		this.redis.set(key, JSON.stringify(value));
	}

	del(key: string): void {
		this.redis.del(key);
	}
}