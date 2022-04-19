import { RedisMock } from "../../utils/mock/RedisMock";
import { TransactionRepository } from "../../repository/TransactionRepository";
import { StatesEngine } from "../../classes/StatesEngine/Factory";
import { TransactionModel } from "../../providers/Database/models/Transaction";

const repository = new TransactionRepository();
const redis = new RedisMock();

const statesEngine = new StatesEngine(repository, redis);

describe("Integration Test of Class StatesEngine", () => {

	afterAll(async () => {
		redis.del("account-10000-003");
		await TransactionModel.deleteMany({});
	});
    
	test("should create the transaction", async () => {
		await statesEngine.execute( { accountId: "10000-003", type: "debit", value: 100 } );
		const transactions = await repository.getAllAccountId();
		expect(transactions.length).toBe(1);
	});
});