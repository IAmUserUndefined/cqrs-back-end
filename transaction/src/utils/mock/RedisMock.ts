/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { IRedis } from "../../providers/Redis/IRedis";

export class RedisMock implements IRedis {

	redis: any = {};	

	async getConnection(): Promise<boolean> {
		return true;
	}

	async get(key: string): Promise<number> {
		return this.redis[key];
	}

	set(key: string, value: any): void {
		this.redis = { ...this.redis, [key]: value };
	}

	del(key: string): void {
		this.redis = {};
	}

}