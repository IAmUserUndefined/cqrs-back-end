/* eslint-disable @typescript-eslint/no-empty-function */

import { IDatabase } from "../../providers/Database/IDatabase";
import { TransactionRepositoryInMemorian } from "../../repository/TransactionRepositoryInMemorian";
import { RedisMock } from "../../utils/mock/RedisMock";
import { StatesEngine } from "../../classes/StatesEngine/Factory";
import { Retry } from "../../classes/Retry/Factory";

class Database implements IDatabase {

	async connection(): Promise<boolean> {
		return true;
	}

	async cLoseConnection(): Promise<void> {}
    
}

const database = new Database();
const repository = new TransactionRepositoryInMemorian();
const redis = new RedisMock();
const statesEngine = new StatesEngine(repository, redis);

const retry = new Retry(database, redis, statesEngine);

describe("Unit Test of Class Retry", () => {
    
	test("should connect in database and in redis and create the transaction", async () => {
		await retry.execute( { accountId: "10000-003", type: "debit", value: 100 } );
		const transactions = await repository.getAllAccountId();
		expect(transactions.length).toBe(5);
	});

});