import { TransactionRepositoryInMemorian } from "../../repository/TransactionRepositoryInMemorian";
import { RedisMock } from "../../utils/mock/RedisMock";
import { RechargeFullBalance } from "../../classes/RechargeFullBalance/Factory";

const repository = new TransactionRepositoryInMemorian();
const redis = new RedisMock();

const rechargeFullBalance = new RechargeFullBalance(repository, redis);

describe("Unit Test of Class RechargeFullBalance", () => {
    
	test("should do the recharge full balance", async () => {
		await rechargeFullBalance.execute();
		const balanceOne = await redis.get("account-10000-000");
		const balanceTwo = await redis.get("account-10000-001");
		expect(balanceOne).toBe(150);
		expect(balanceTwo).toBe(50);
	});
});