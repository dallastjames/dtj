import { Collection, AggregationCursor } from 'mongodb';

export function getAggregateCursor<T>(
    collection: Collection<T>,
    pipeline: Object[]
): AggregationCursor<T> {
    const resultCursor: AggregationCursor = collection.aggregate(pipeline);
    return resultCursor;
}
