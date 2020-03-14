import { FilterQuery, ObjectId } from 'mongodb';
import { Projection } from './Projection';
import { MongoSort } from './MongoSort';
import { DocStatus } from '../enums';

export interface FindParams<T = any> {
    query: FilterQuery<T>;
    sort?: MongoSort;
    page?: number;
    limit?: number;
    projection?: Projection;
}

export interface FindParamsById<T = any> {
    _id: ObjectId;
    projection?: Projection;
    status?: DocStatus[];
}
