import { Database } from "../providers/Database/Database";
import { TransactionModel } from "../providers/Database/models/Transaction";
import { ITransactionRepository } from "./ITransactionRepository";

export class TransactionRepository implements ITransactionRepository {

	database: Database;

	constructor() {
		this.database = new Database();
		this.database.connection();
	}

	async store(accountId: string, value: number, type: string): Promise<void> {
		await TransactionModel.create({
			accountId,
			value,
			type
		});
	}

	async getAllAccountId(): Promise<{ accountId: string }[]> {
		return await TransactionModel.find({}).select("accountId -_id");
		
	}

	async getValues(accountId: string): Promise<{ value: number, type: string }[]> {
		return await TransactionModel.find({
			accountId
		}).select("value type -_id");
	}
}