import { TransactionRepository } from "../../repository/TransactionRepository";
import { Redis } from "../../providers/Redis/Redis";
import { StatesEngine } from "./Factory";

const repository = new TransactionRepository();
const redis = new Redis();

export const stateEngine = new StatesEngine(repository, redis);