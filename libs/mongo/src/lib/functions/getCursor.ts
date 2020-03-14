import { Cursor, Collection } from 'mongodb';
import { FindParams } from '../models';

export function getCursor<T>(
    collection: Collection<T>,
    params: FindParams<T>
): Cursor<T> {
    const resultCursor: Cursor = collection.find<T>(params.query);
    if (typeof params.limit === 'number' && params.limit > 0) {
        if (typeof params.page === 'number' && params.page > 0) {
            resultCursor.skip((params.page - 1) * params.limit);
        }
        resultCursor.limit(params.limit);
    }
    if (!!params.sort) {
        resultCursor.sort(params.sort);
    }
    if (!!params.projection) {
        resultCursor.project(params.projection);
    }
    return resultCursor;
}
