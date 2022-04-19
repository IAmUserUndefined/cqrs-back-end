jest.setTimeout(15000);

import { TransactionModel } from "../../providers/Database/models/Transaction";
import { Database } from "../../providers/Database/Database";
import { facade } from "../../classes/Facade/Implementation";
import { Redis } from "../../providers/Redis/Redis";

const database = new Database(); 
const redis = new Redis();

describe("Integration Test of Class Facade", () => {

	beforeEach( async () => {
		await TransactionModel.create({
			accountId: "10000-000",
			value: 200,
			type: "debit",
		});
	});

	afterEach(async () => {
		redis.del("10000-000");
		await TransactionModel.deleteMany({});
		await database.cLoseConnection();
	});
   
	test("should return the balance", async () => {
		const balance = await facade.execute( { accountId: "10000-000" } );
		expect(balance).toBe(200);
	});
});