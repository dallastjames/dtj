import { FindOneOptions, Collection, FilterQuery } from 'mongodb';
import { FindParamsById } from '../models';
import { DocStatus } from '../enums';

export async function findOneById<T = any>(
    collection: Collection<T>,
    params: FindParamsById
): Promise<T> {
    const options: FindOneOptions = {};
    if (!!params.projection) {
        options.projection = params.projection;
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
    return collection.findOne<T>(query, options);
}
