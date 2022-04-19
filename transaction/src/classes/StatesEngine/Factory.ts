import { ITransactionRepository } from "../../repository/ITransactionRepository";
import { IRedis } from "../../providers/Redis/IRedis";
import { IStatesEngine } from "./Interface";
import { IStatesEngineDTO } from "./DTO";

export class StatesEngine implements IStatesEngine {

	constructor(
		private repository: ITransactionRepository,
		private redis: IRedis
	) {}

	async execute({ accountId, type, value }: IStatesEngineDTO): Promise<void> {

		try {
			
			await this.repository.store(accountId, value, type);
	
			const balance = await this.redis.get(`account-${accountId}`) || 0;
	
			const totalBalance = type === "debit" ? balance + value : balance - value;
		
			this.redis.set(`account-${accountId}`, totalBalance);
			
		} catch(e) {
			console.log(e);
		}
	}
}