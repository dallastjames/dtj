import { Injectable } from '@nestjs/common';
import {
    Collection,
    Cursor,
    AggregationCursor,
    DeleteWriteOpResultObject,
    UpdateWriteOpResult,
    InsertWriteOpResult,
    InsertOneWriteOpResult,
    FilterQuery,
    UpdateQuery
} from 'mongodb';
import {
    MongoConnector,
    FindParams,
    getCursor,
    getAggregateCursor,
    findOne,
    FindParamsById,
    findOneById,
    addBaseFieldsToDoc,
    insertOne,
    insertMany,
    updateOne,
    UpdateParams,
    updateMany,
    UpdateParamsById,
    updateOneById,
    updateBase,
    deleteOne,
    deleteOneById,
    deleteMany,
    hardDeleteOne,
    hardDeleteMany,
    hardDeleteOneById
} from '@dtj/mongo';

@Injectable()
export class MongoCollection {
    // Db Cache
    private _collection: Collection<any>;

    constructor(private _connector: MongoConnector) {
        if (!this['__collectionName']) {
            throw new Error(
                `No Collection Name set for ${this['constructor']['name']}! Use @CollectionName() decorator to set one.`
            );
        }
        this._collection = _connector.getCollection(this['__collectionName']);
    }

    /**
     * Are you sure you should be using this? The answer is probably no.
     *
     * @returns {Collection<T>} Direct collection access
     */
    protected __getCollection<T>(): Collection<T> {
        return this._collection;
    }

    protected getCursor<T = any>(params: FindParams<T>): Cursor<T> {
        return getCursor(this._collection, params);
    }

    protected getAggregateCursor<T = any>(
        pipeline: Object[]
    ): AggregationCursor<T> {
        return getAggregateCursor(this._collection, pipeline);
    }

    protected findOne<T = any>(params: FindParams<T>): Promise<T> {
        return findOne<T>(this._collection, params);
    }

    protected findOneById<T = any>(params: FindParamsById<T>): Promise<T> {
        return findOneById<T>(this._collection, params);
    }

    protected insertOne(doc: Object): Promise<InsertOneWriteOpResult<any>> {
        return insertOne(this._collection, doc);
    }

    protected insertMany(docs: Object[]): Promise<InsertWriteOpResult<any>> {
        return insertMany(this._collection, docs);
    }

    protected updateOne<T = any>(
        params: UpdateParams<T>
    ): Promise<UpdateWriteOpResult> {
        return updateOne(this._collection, params);
    }

    protected updateOneById<T = any>(
        params: UpdateParamsById<T>
    ): Promise<UpdateWriteOpResult> {
        return updateOneById(this._collection, params);
    }

    protected updateMany<T = any>(
        params: UpdateParams<T>
    ): Promise<UpdateWriteOpResult> {
        return updateMany(this._collection, params);
    }

    protected updateBase<T = any>(
        filter: FilterQuery<T>,
        update: UpdateQuery<T>
    ): Promise<UpdateWriteOpResult> {
        return updateBase(this._collection, filter, update);
    }

    protected deleteOne<T = any>(
        params: FindParams<T>
    ): Promise<UpdateWriteOpResult> {
        return deleteOne(this._collection, params);
    }

    protected deleteOneById<T = any>(
        params: FindParamsById<T>
    ): Promise<UpdateWriteOpResult> {
        return deleteOneById(this._collection, params);
    }

    protected deleteMany<T = any>(
        params: FindParams<T>
    ): Promise<UpdateWriteOpResult> {
        return deleteMany(this._collection, params);
    }

    protected hardDeleteOne<T = any>(
        params: FindParams<T>
    ): Promise<DeleteWriteOpResultObject> {
        return hardDeleteOne(this._collection, params);
    }

    protected hardDeleteOneById<T = any>(
        params: FindParamsById<T>
    ): Promise<DeleteWriteOpResultObject> {
        return hardDeleteOneById(this._collection, params);
    }

    protected hardDeleteMany<T = any>(
        params: FindParams<T>
    ): Promise<DeleteWriteOpResultObject> {
        return hardDeleteMany(this._collection, params);
    }
}
