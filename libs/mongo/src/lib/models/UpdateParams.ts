import { FilterQuery, ObjectId } from 'mongodb';
import { DocStatus } from '../enums';

export interface UpdateParams<T = any> {
    query: FilterQuery<T>;
    update: Object;
}

export interface UpdateParamsById<T = any> {
    _id: ObjectId;
    update: Object;
    status?: DocStatus[];
}
