import { FindParams } from '../models';
import { FindOneOptions, Collection } from 'mongodb';

export async function findOne<T = any>(
    collection: Collection<T>,
    params: FindParams<T>
): Promise<T> {
    const options: FindOneOptions = {};
    if (!!params.projection) {
        options.projection = params.projection;
    }
    if (!!params.sort) {
        options.sort = params.sort;
    }
    return collection.findOne<T>(params.query, options);
}
