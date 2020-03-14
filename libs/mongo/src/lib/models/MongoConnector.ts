import { Db, MongoClient, MongoClientOptions, Collection } from 'mongodb';
import { ConnectionOptions } from './ConnectionOptions';

export class MongoConnector {
    private dbConnection: Db;

    constructor(private _options: ConnectionOptions) {}

    public async connect(): Promise<void> {
        if (!this.dbConnection) {
            this.dbConnection = await this._connect();
        }
    }

    public getCollection<T>(collectionName: string): Collection<T> {
        return this.dbConnection.collection<T>(collectionName);
    }

    private async _connect(): Promise<Db> {
        const mongoOptions: MongoClientOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        if (!!this._options.username || !!this._options.password) {
            mongoOptions.auth = {
                user: this._options.username,
                password: this._options.password
            };
        }
        if (!!this._options.replicaSetName) {
            mongoOptions.replicaSet = this._options.replicaSetName;
        }
        if (!!this._options.authSource) {
            mongoOptions.authSource = this._options.authSource;
            mongoOptions.ssl = true;
        }

        try {
            const connection = await MongoClient.connect(
                `mongodb://${this._options.url}/${this._options.dbName}`,
                mongoOptions
            );
            this.dbConnection = connection.db(this._options.dbName);
            if (!this.dbConnection) {
                throw new Error(
                    `Can't connect to DB: ${JSON.stringify(this._options)}`
                );
            }
            return this.dbConnection;
        } catch (e) {
            throw new Error(
                `Can't connect to DB: ${JSON.stringify(this._options)}`
            );
        }
    }
}
