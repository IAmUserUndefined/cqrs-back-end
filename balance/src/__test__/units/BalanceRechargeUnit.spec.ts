import { TransactionRepositoryInMemorian  } from "../../repository/TransactionRepositoryInMemorian";
import { BalanceRechargeUnit  } from "../../classes/BalanceRechargeUnit/Factory";

const repository = new TransactionRepositoryInMemorian(); 
const balanceRechargeUnit = new BalanceRechargeUnit(repository);

describe("Unit Test of Class BalanceRechargeUnit", () => {

	test("should return the total balance", async () => {
		const balance = await balanceRechargeUnit.execute( { accountId: "10000-000" } );
		expect(balance).toBe(250);
	});

});