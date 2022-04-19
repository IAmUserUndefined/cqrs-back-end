export interface ITransactionRepository {
    store(accountId: string, value: number, type: string): Promise<void>;
    getAllAccountId(): Promise<{ accountId: string }[]>;
    getValues(accountId: string): Promise<{ value: number, type: string }[]>;
}