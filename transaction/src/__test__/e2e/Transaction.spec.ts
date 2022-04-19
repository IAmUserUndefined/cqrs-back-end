import { TransactionModel } from "../../providers/Database/models/Transaction";
import { Database } from "../../providers/Database/Database";
import { Redis } from "../../providers/Redis/Redis";

const database = new Database(); 
const redis = new Redis();

import request from "supertest";

import app from "../../app";

describe("E2E", () => {

	afterAll(async () => {
		redis.del("10000-000");
		await TransactionModel.deleteMany({});
		await database.cLoseConnection();
	});
   
	test("POST /", async () => {

		const response = await request(app)
			.post("/")
			.send({
				accountId: "10000-000",
				type: "debit",
				value: 200,
			});

		expect(response.statusCode).toBe(200);
    
	});
});