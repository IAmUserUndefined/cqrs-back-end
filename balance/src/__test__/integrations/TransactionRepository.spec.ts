jest.setTimeout(15000);

import { TransactionRepository } from "../../repository/TransactionRepository";
import { TransactionModel } from "../../providers/Database/models/Transaction";
import { Database } from "../../providers/Database/Database";

const database = new Database(); 
const repository = new TransactionRepository();

describe("Integration Test of Class TransactionRepository", () => {

	beforeAll( async () => {
		await TransactionModel.create({
			accountId: "10000-000",
			value: 200,
			type: "debit",
		});
	});

	afterAll(async () => {
		await TransactionModel.deleteMany({});
		await database.cLoseConnection();
	});
   
	test("should return the value and the type of transaction", async () => {
		const transaction = await repository.getValues("10000-000");
		expect(transaction[0].value).toBe(200);
		expect(transaction[0].type).toBe("debit");
	});
});