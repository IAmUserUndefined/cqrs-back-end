import { TransactionRepository } from "../../repository/TransactionRepository";
import { Redis } from "../../providers/Redis/Redis";
import { RechargeFullBalance } from "./Factory";

const repository = new TransactionRepository();
const redis = new Redis();

export const rechargeFullBalance = new RechargeFullBalance(repository, redis);