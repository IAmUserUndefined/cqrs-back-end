import { stateEngine } from "../StatesEngine/Implementation";
import { Database } from "../../providers/Database/Database";
import { Redis } from "../../providers/Redis/Redis";
import { Retry } from "./Factory";

const database = new Database();
const redis = new Redis();

export const retry = new Retry(database, redis, stateEngine);