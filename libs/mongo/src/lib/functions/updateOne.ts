import { Collection, UpdateWriteOpResult } from 'mongodb';
import { UpdateParams } from '../models';

export async function updateOne<T = any>(
    collection: Collection<T>,
    params: UpdateParams<T>
): Promise<UpdateWriteOpResult> {
    if (typeof params.update['_id'] !== 'undefined') {
        delete params.update['_id'];
    }
    if (typeof params.update['modifiedDate'] !== 'undefined') {
        delete params.update['modifiedDate'];
    }
    return collection.updateOne(params.query, {
        $currentDate: {
            modifiedDate: true
        },
        $set: params.update
    } as any);
}
