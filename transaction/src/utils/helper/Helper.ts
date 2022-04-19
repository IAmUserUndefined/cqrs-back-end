import "dotenv/config";

class Helper {

	static getDatabaseUrlEnvironmentVariable(){
		return process.env.DATABASE_URL;
	}

	static getRedisHostEnvironmentVariable(){
		return process.env.REDIS_HOST;
	}

	static getRedisPortEnvironmentVariable(){
		return process.env.REDIS_PORT;
	}

}

export default Helper;