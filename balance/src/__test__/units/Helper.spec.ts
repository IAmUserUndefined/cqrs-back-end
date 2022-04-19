import Helper from "../../utils/helper/Helper";

describe("Unit Test of Class Helper", () => {

	test("Should return environment variable ", () => {
          
		const databaseUrl = Helper.getDatabaseUrlEnvironmentVariable();
		const redisHost = Helper.getRedisHostEnvironmentVariable();
		const RedisPort = Helper.getRedisPortEnvironmentVariable();

		expect(databaseUrl).not.toBeUndefined();
		expect(redisHost).not.toBeUndefined();
		expect(RedisPort).not.toBeUndefined();
	});
});