import { Collection, FilterQuery, UpdateWriteOpResult } from 'mongodb';
import { UpdateParamsById } from '../models';
import { DocStatus } from '../enums';

export async function updateOneById<T = any>(
    collection: Collection<T>,
    params: UpdateParamsById<T>
): Promise<UpdateWriteOpResult> {
    if (typeof params.update['_id'] !== 'undefined') {
        delete params.update['_id'];
    }
    if (typeof params.update['modifiedDate'] !== 'undefined') {
        delete params.update['modifiedDate'];
    }
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
    return collection.updateOne(query, {
        $currentDate: {
            modifiedDate: true
        },
        $set: params.update
    } as any);
}
