import { Collection, UpdateWriteOpResult } from 'mongodb';
import { FindParams, UpdateParams } from '../models';
import { DocStatus } from '../enums';
import { updateMany } from './updateMany';

export async function deleteMany<T = any>(
    collection: Collection<T>,
    params: FindParams<T>
): Promise<UpdateWriteOpResult> {
    const update: UpdateParams = {
        query: params.query,
        update: { status: DocStatus.InActive, deletedDate: new Date() }
    };
    return updateMany(collection, update);
}
