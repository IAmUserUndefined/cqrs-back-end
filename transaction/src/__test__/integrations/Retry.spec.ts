/* eslint-disable @typescript-eslint/no-empty-function */

import { TransactionModel } from "../../providers/Database/models/Transaction";
import { Database } from "../../providers/Database/Database";
import { TransactionRepository } from "../../repository/TransactionRepository";
import { Redis } from "../../providers/Redis/Redis";
import { StatesEngine } from "../../classes/StatesEngine/Factory";
import { Retry } from "../../classes/Retry/Factory";

const database = new Database();
const repository = new TransactionRepository();
const redis = new Redis();
const statesEngine = new StatesEngine(repository, redis);

const retry = new Retry(database, redis, statesEngine);

describe("Integration Test of Class Retry", () => {

	afterAll(async () => {
		redis.del("account-10000-003");
		await TransactionModel.deleteMany({});
	});
    
	test("should connect in database and in redis and create the transaction", async () => {
		await retry.execute( { accountId: "10000-003", type: "debit", value: 100 } );
		const transactions = await repository.getAllAccountId();
		expect(transactions.length).toBe(1);
	});

});