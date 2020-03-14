import { Collection, DeleteWriteOpResultObject } from 'mongodb';
import { FindParams } from '../models';

export async function hardDeleteMany<T = any>(
    collection: Collection<T>,
    params: FindParams<T>
): Promise<DeleteWriteOpResultObject> {
    return collection.deleteMany(params.query);
}
