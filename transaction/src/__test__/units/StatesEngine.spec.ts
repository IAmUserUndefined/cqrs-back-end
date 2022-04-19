import { TransactionRepositoryInMemorian } from "../../repository/TransactionRepositoryInMemorian";
import { RedisMock } from "../../utils/mock/RedisMock";
import { StatesEngine } from "../../classes/StatesEngine/Factory";

const repository = new TransactionRepositoryInMemorian();
const redis = new RedisMock();

const statesEngine = new StatesEngine(repository, redis);

describe("Unit Test of Class StatesEngine", () => {
    
	test("should create the transaction", async () => {
		await statesEngine.execute( { accountId: "10000-003", type: "debit", value: 100 } );
		const transactions = await repository.getAllAccountId();
		expect(transactions.length).toBe(5);
	});
});