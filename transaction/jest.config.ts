export default {
	preset: "ts-jest",
	testEnvironment: "node",
	globalSetup: "<rootDir>/dotenv.test.config.ts",
	testMatch: [
		"**/__test__/**/*.[jt]s?(x)",
		"**/?(*.)+(spec|test).[tj]s?(x)"
	],
};