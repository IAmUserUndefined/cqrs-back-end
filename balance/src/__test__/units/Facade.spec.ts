/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import { IRedis } from "../../providers/Redis/IRedis";
import { ICache } from "../../providers/Cache/ICache";
import { TransactionRepositoryInMemorian } from "../../repository/TransactionRepositoryInMemorian";
import { BalanceRechargeUnit } from "../../classes/BalanceRechargeUnit/Factory";
import { Facade } from "../../classes/Facade/Factory";

class Cache implements ICache {

	cache: any = {};
    
	set(key: string, value: any, expiryTime?: number): void {
		this.cache = { ...this.cache, [key]: value };
	}

	get(key: string): string {
		return this.cache[key];
	}

	del(key: string): void {
		this.cache = {};
	}

}

class Redis implements IRedis {

	redis: any = {};

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

const cache = new Cache();
const redis = new Redis();
const repository = new TransactionRepositoryInMemorian();
const balanceRechargeUnit = new BalanceRechargeUnit(repository);
const facade = new Facade(redis, cache, balanceRechargeUnit);

describe("Unit Test of Class Facade", () => {
    
	test("should return the balance of cache", async () => {
		cache.set("account-10000-000", 250);
		const balance = await facade.execute( { accountId: "10000-000" } );
		expect(balance).toBe(250);
		cache.del("account-10000-000");
	});

	test("should return the balance of redis", async () => {
		redis.set("account-10000-000", 250);
		const cacheBalance = cache.get("account-10000-000");
		const balance = await facade.execute( { accountId: "10000-000" } );
		expect(cacheBalance).toBeUndefined();
		expect(balance).toBe(250);
		redis.del("account-10000-000");
		cache.del("account-10000-000");
	});

	test("should return the balance of class BalanceRechargeUnit", async () => {
		const cacheBalance = cache.get("account-10000-000");
		const redisBalance = await redis.get("account-10000-000");
		const balance = await facade.execute( { accountId: "10000-000" } );
		expect(cacheBalance).toBeUndefined();
		expect(redisBalance).toBeUndefined();
		expect(balance).toBe(250);
	});
});
