export interface IDatabase {
    connection(): Promise<boolean>;
    cLoseConnection(): Promise<void>
}