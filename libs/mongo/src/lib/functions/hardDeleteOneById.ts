import { Collection, DeleteWriteOpResultObject, FilterQuery } from 'mongodb';
import { FindParamsById } from '../models';
import { DocStatus } from '../enums';

export async function hardDeleteOneById<T = any>(
    collection: Collection<T>,
    params: FindParamsById<T>
): Promise<DeleteWriteOpResultObject> {
    let status = [DocStatus.Active];
    if (Array.isArray(params.status)) {
        status = params.status;
    }
    const query: FilterQuery<any> = {
        _id: params._id
    };
    if (params.status.length > 0) {
        query.status = {
            $in: status
        };
    }
    return collection.deleteOne(query);
}
