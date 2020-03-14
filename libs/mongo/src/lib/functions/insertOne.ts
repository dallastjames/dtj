import { ObjectId, InsertOneWriteOpResult, Collection } from 'mongodb';
import { addBaseFieldsToDoc } from './addBaseFieldsToDoc';

export async function insertOne<T = any>(
    collection: Collection<T>,
    doc: T
): Promise<InsertOneWriteOpResult<any>> {
    const newDoc = addBaseFieldsToDoc<T>(doc);
    if (
        typeof newDoc['_id'] !== 'undefined' &&
        !(newDoc['_id'] instanceof ObjectId)
    ) {
        delete newDoc['_id'];
    }
    return collection.insertOne(newDoc as any);
}
