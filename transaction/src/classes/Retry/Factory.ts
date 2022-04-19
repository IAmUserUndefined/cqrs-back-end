import { IDatabase } from "../../providers/Database/IDatabase";
import { IRedis } from "../../providers/Redis/IRedis";
import { IStatesEngine } from "../StatesEngine/Interface";
import { IRetryDTO } from "./DTO";

export class Retry {

	constructor(
		private database: IDatabase,
		private redis: IRedis,
		private stateEngine: IStatesEngine
	) {}

	async execute({ accountId, type, value }: IRetryDTO) {

		const connectionDatabase = await this.database.connection();
		const connectionRedis = await this.redis.getConnection();

		if(connectionDatabase && connectionRedis)
			await this.stateEngine.execute( { accountId, type, value } )
				.catch(e => console.log(e));

	}
}