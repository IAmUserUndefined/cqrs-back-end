import { TransactionModel } from "../../providers/Database/models/Transaction";
import { TransactionRepository } from "../../repository/TransactionRepository";
import { Redis } from "../../providers/Redis/Redis";
import { RechargeFullBalance } from "../../classes/RechargeFullBalance/Factory";

const repository = new TransactionRepository();
const redis = new Redis();

const rechargeFullBalance = new RechargeFullBalance(repository, redis);

describe("Integration Test of Class RechargeFullBalance", () => {

	beforeAll(async () => {
		await TransactionModel.create({
			accountId: "10000-000",
			type: "debit",
			value: 200,
		});

		await TransactionModel.create({
			accountId: "10000-000",
			type: "credit",
			value: 50,
		});

		await TransactionModel.create({
			accountId: "10000-001",
			type: "debit",
			value: 100,
		});

		await TransactionModel.create({
			accountId: "10000-001",
			type: "credit",
			value: 50,
		});
	});

	afterAll(async () => {
		redis.del("account-10000-000");
		redis.del("account-10000-001");
		await TransactionModel.deleteMany({});
	});
    
	test("should do the recharge full balance", async () => {
		await rechargeFullBalance.execute();
		const balanceOne = await redis.get("account-10000-000");
		const balanceTwo = await redis.get("account-10000-001");
		expect(balanceOne).toBe(150);
		expect(balanceTwo).toBe(50);
	});
});