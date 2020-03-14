import { UpdateWriteOpResult, Collection } from 'mongodb';
import { UpdateParams } from '../models';
import { updateBase } from './updateBase';

export async function updateMany<T = any>(
    collection: Collection<T>,
    params: UpdateParams<T>
): Promise<UpdateWriteOpResult> {
    if (typeof params.update['_id'] !== 'undefined') {
        delete params.update['_id'];
    }
    if (typeof params.update['modifiedDate'] !== 'undefined') {
        delete params.update['modifiedDate'];
    }
    return updateBase(collection, params.query, {
        $currentDate: {
            modifiedDate: true
        },
        $set: params.update
    } as any);
}
