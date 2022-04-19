import { ITransactionRepository } from "../../repository/ITransactionRepository";
import { IRedis } from "../../providers/Redis/IRedis";

export class RechargeFullBalance {

	constructor(
		private repository: ITransactionRepository,
		private redis: IRedis
	) {}
	
	async execute(): Promise<void> {

		try {

			const accountsId = await this.repository.getAllAccountId();

			const balancesRecovered: string[] = [];

			for(let i = 0; i < accountsId.length; i++) {

				if(!balancesRecovered.includes(accountsId[i].accountId)) {

					const values = await this.repository.getValues(accountsId[i].accountId);

					let totalBalance = 0;

					values.forEach(({ value, type }: { value: number, type: string }) => {
						totalBalance = type === "debit" ? totalBalance + value : totalBalance - value;
					});
					
					this.redis.set(`account-${accountsId[i].accountId}`, totalBalance);
					
					balancesRecovered.push(accountsId[i].accountId);
				}
			}
			
		} catch(e) {
			console.log(e);
		}

	}
}