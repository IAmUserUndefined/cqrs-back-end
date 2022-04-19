import { IStatesEngineDTO } from "./DTO";

export interface IStatesEngine {
    execute({ accountId, type, value }: IStatesEngineDTO): Promise<void>;
}