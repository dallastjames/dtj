import { Module, Global, DynamicModule } from '@nestjs/common';
import { ConnectionOptions, MongoConnector } from '@dtj/mongo';

export * from './decorators';

@Global()
@Module({})
export class MongoModule {
    public static forRoot(options: ConnectionOptions): DynamicModule {
        const connectionProvider = {
            provide: MongoConnector,
            useFactory: async (): Promise<MongoConnector> => {
                const connector = new MongoConnector(options);
                await connector.connect();
                return connector;
            }
        };

        return {
            module: MongoModule,
            providers: [connectionProvider],
            exports: [connectionProvider]
        };
    }
}
