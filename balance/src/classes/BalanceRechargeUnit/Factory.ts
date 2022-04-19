import { ITransactionRepository } from "../../repository/ITransactionRepository";
import { IBalanceRechargeUnitDTO } from "./DTO";

export class BalanceRechargeUnit {

	constructor(
		private repository: ITransactionRepository
	) {}

	async execute({ accountId }: IBalanceRechargeUnitDTO): Promise<number> {

		try {
			
			const values = await this.repository.getValues(accountId);

			let totalBalance = 0;
	
			values.forEach(({ value, type }: { value: number, type: string }) => {
				totalBalance = type === "debit" ? totalBalance + value : totalBalance - value;
			});

			return totalBalance;

		} catch(e) {
			console.log(e);
		}
        
	}
}