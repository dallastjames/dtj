import {
    Collection,
    UpdateQuery,
    UpdateWriteOpResult,
    FilterQuery
} from 'mongodb';

export async function updateBase<T = any>(
    collection: Collection<T>,
    filter: FilterQuery<T>,
    update: UpdateQuery<T>
): Promise<UpdateWriteOpResult> {
    if (typeof update['_id'] !== 'undefined') {
        delete update['_id'];
    }
    if (typeof update['modifiedDate'] !== 'undefined') {
        delete update['modifiedDate'];
    }
    return collection.updateMany(filter, {
        $currentDate: {
            modifiedDate: true
        },
        ...update
    } as any);
}
