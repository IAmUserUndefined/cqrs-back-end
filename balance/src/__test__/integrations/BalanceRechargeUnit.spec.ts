import { TransactionModel } from "../../providers/Database/models/Transaction";
import { balanceRechargeUnit } from "../../classes/BalanceRechargeUnit/Implementation";
import { Database } from "../../providers/Database/Database";

const database = new Database();

describe("Integration Test of Class BalanceRechargeUnit", () => {

	beforeAll( async () => {
		await TransactionModel.create({
			accountId: "10000-000",
			value: 200,
			type: "debit",
		});

		await TransactionModel.create({
			accountId: "10000-000",
			value: 50,
			type: "credit",
		});
	});

	afterAll(async () => {
		await TransactionModel.deleteMany({});
		await database.cLoseConnection();
	});
   
	test("should return the balance", async () => {
		const balance = await balanceRechargeUnit.execute( { accountId: "10000-000" } );
		expect(balance).toBe(150);
	});
});