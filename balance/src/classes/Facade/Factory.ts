import { ICache } from "../../providers/Cache/ICache";
import { IRedis } from "../../providers/Redis/IRedis";
import { IBalanceRechargeUnit } from "../BalanceRechargeUnit/Interface";
import { IFacadeDTO } from "./DTO";

export class Facade {

	constructor(
		private redis: IRedis,
		private cache: ICache,
		private balanceRechargeUnit: IBalanceRechargeUnit
	) {}

	async execute({ accountId }: IFacadeDTO) {

		try {

			const cacheBalance = this.cache.get(`account-${accountId}`);

			if(!cacheBalance) {
	
				const redisBalance = await this.redis.get(`account-${accountId}`);
		
				if(!redisBalance) {
	
					const totalBalance = await this.balanceRechargeUnit.execute( { accountId } );
	
					this.redis.set(`account-${accountId}`, totalBalance);
	
					this.cache.set(`account-${accountId}`, totalBalance, 300);
	
					return this.cache.get(`account-${accountId}`);
	
				}
	
				this.cache.set(`account-${accountId}`, redisBalance, 300);
				
				return this.cache.get(`account-${accountId}`);
			}
	
			return cacheBalance;
			
		} catch(e) {
			console.log(e);
			return "Houve um erro para retornar seu saldo, tente novamente mais tarde";
		}
	}
}