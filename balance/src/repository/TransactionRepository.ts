import { TransactionModel } from "../providers/Database/models/Transaction";
import { Database } from "../providers/Database/Database";
import { ITransactionRepository } from "./ITransactionRepository";

export class TransactionRepository implements ITransactionRepository {

	private database: Database;

	constructor() {
		this.database = new Database();
		this.database.connection();
	}

	async getValues(accountId: string): Promise<{ value: number, type: string }[]> {
		return await TransactionModel.find({
			accountId
		}).select("value type -_id");
	}
}