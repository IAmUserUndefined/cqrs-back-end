import { Schema, model } from "mongoose";

const TransactionSchema = new Schema({

	accountId: {
		type: String,
		require: true
	},

	value: {
		type: Number,
		require: true
	},

	type: {
		type: String,
		require: true
	},

	createdAt: { 
		type: Date, 
		default: Date.now 
	},

});

export const TransactionModel = model("transactions", TransactionSchema);