import { IBalanceRechargeUnitDTO } from "./DTO";

export interface IBalanceRechargeUnit{
    execute( { accountId }: IBalanceRechargeUnitDTO ): Promise<number>;
}