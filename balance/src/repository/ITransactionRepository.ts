export interface ITransactionRepository {
    getValues(accountId: string): Promise<{ value: number, type: string }[]>;
}