import mongoose from "mongoose";
import Helper from "../../utils/helper/Helper";
import { IDatabase } from "./IDatabase";

export class Database implements IDatabase {

	async connection()  {
		return await mongoose.connect(Helper.getDatabaseUrlEnvironmentVariable())
			.then(() => true)
			.catch((e) => {
				console.log(e);
				return false;
			});
	}

	async cLoseConnection() {
		mongoose.connection.close();
	}
}