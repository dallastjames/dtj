import { Collection, DeleteWriteOpResultObject } from 'mongodb';
import { FindParams } from '../models';

export async function hardDeleteOne<T = any>(
    collection: Collection<T>,
    params: FindParams<T>
): Promise<DeleteWriteOpResultObject> {
    return collection.deleteOne(params.query);
}
