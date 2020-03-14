import { Collection, UpdateWriteOpResult } from 'mongodb';
import { FindParamsById, UpdateParams, UpdateParamsById } from '../models';
import { DocStatus } from '../enums';
import { updateOneById } from './updateOneById';

export async function deleteOneById<T = any>(
    collection: Collection<T>,
    params: FindParamsById<T>
): Promise<UpdateWriteOpResult> {
    const update: UpdateParamsById = {
        ...params,
        update: { status: DocStatus.InActive, deletedDate: new Date() }
    };
    return updateOneById(collection, update);
}
