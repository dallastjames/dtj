import { Collection, InsertWriteOpResult, ObjectId } from 'mongodb';
import { addBaseFieldsToDoc } from './addBaseFieldsToDoc';

export async function insertMany<T = any>(
    collection: Collection<T>,
    docs: T[]
): Promise<InsertWriteOpResult<any>> {
    const updatedDocs = docs.map(d => {
        const newDoc = addBaseFieldsToDoc<T>(d);
        if (
            typeof newDoc['_id'] !== 'undefined' &&
            !(newDoc['_id'] instanceof ObjectId)
        ) {
            delete newDoc['_id'];
        }
        return newDoc;
    });
    return collection.insertMany(updatedDocs as any[]);
}
