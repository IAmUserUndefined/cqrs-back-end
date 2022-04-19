import { balanceRechargeUnit } from "../BalanceRechargeUnit/Implementation";
import { Cache as cache } from "../../providers/Cache/Cache";
import { Redis } from "../../providers/Redis/Redis";
import { Facade } from "./Factory";

const redis = new Redis();

export const facade = new Facade(redis, cache, balanceRechargeUnit);