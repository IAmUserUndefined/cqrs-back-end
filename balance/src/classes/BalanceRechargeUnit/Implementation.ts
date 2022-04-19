import { TransactionRepository } from "../../repository/TransactionRepository";
import { BalanceRechargeUnit } from "./Factory";

const repository = new TransactionRepository();

export const balanceRechargeUnit = new BalanceRechargeUnit(repository); 