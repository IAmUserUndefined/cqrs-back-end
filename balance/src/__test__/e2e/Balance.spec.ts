jest.setTimeout(15000);

import { TransactionModel } from "../../providers/Database/models/Transaction";
import { Database } from "../../providers/Database/Database";
import { Redis } from "../../providers/Redis/Redis";

const database = new Database(); 
const redis = new Redis();

import request from "supertest";

import app from "../../app";

describe("Test E2E", () => {

	beforeAll( async () => {
		await TransactionModel.create({
			accountId: "10000-000",
			value: 200,
			type: "debit",
		});
	});

	afterAll(async () => {
		redis.del("10000-000");
		await TransactionModel.deleteMany({});
		await database.cLoseConnection();
	});
   
	test("GET /:accountId", async () => {

		const response = await request(app)
			.get("/10000-000");
    
		expect(response.statusCode).toBe(200);
		expect(response.body.balance).toBe(200);
    
	});
});