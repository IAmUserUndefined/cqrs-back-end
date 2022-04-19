export default class Transaction {
	readonly _id: string;
	accountId: string;
	value: number;
	type: string;
	createdAt: Date;
}