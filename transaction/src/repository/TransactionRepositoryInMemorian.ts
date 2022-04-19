import Transaction from "../entities/Transaction";
import { ITransactionRepository } from "./ITransactionRepository";

export class TransactionRepositoryInMemorian implements ITransactionRepository{

	transaction: Transaction[] = [
		{
			_id: Math.random().toString(),
			accountId: "10000-000",
			type: "debit",
			value: 200,
			createdAt: new Date(Date.now())
		},

		{
			_id: Math.random().toString(),
			accountId: "10000-000",
			type: "credit",
			value: 50,
			createdAt: new Date(Date.now())
		},

		{
			_id: Math.random().toString(),
			accountId: "10000-001",
			type: "debit",
			value: 100,
			createdAt: new Date(Date.now())
		},

		{
			_id: Math.random().toString(),
			accountId: "10000-001",
			type: "credit",
			value: 50,
			createdAt: new Date(Date.now())
		},
	];

	async store(accountId: string, value: number, type: string): Promise<void> {
		this.transaction.push({
			_id: Math.random().toString(),
			accountId: accountId,
			value: value,
			type: type,
			createdAt: new Date(Date.now())
		});
	}

	async getAllAccountId(): Promise<{ accountId: string }[]> {
		return this.transaction.map((transaction: Transaction) => {
			return {
				accountId: transaction.accountId
			};
		});
	}

	async getValues(accountId: string): Promise<{ value: number, type: string }[]> {
		return this.transaction
			.filter((transaction: Transaction) => transaction.accountId === accountId)
			.map(transaction => {
				return {
					value: transaction.value,
					type: transaction.type
				};
			}); 
	}
    
}