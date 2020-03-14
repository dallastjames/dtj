import { UpdateWriteOpResult, Collection } from 'mongodb';
import { FindParams, UpdateParams } from '../models';
import { DocStatus } from '../enums';
import { updateOne } from './updateOne';

export async function deleteOne<T = any>(
    collection: Collection<T>,
    params: FindParams<T>
): Promise<UpdateWriteOpResult> {
    const update: UpdateParams = {
        query: params.query,
        update: { status: DocStatus.InActive, deletedDate: new Date() }
    };
    return updateOne(collection, update);
}
