import { ObjectId } from 'mongodb';

export { ObjectId };

export function createObjectId(val?: string | ObjectId): ObjectId {
    if (!!val) {
        if (val instanceof ObjectId) {
            return val;
        } else {
            try {
                return new ObjectId(val);
            } catch (e) {
                console.warn(`Invalid ID supplied to createObjectId(): ${val}`);
                return new ObjectId();
            }
        }
    } else {
        return new ObjectId();
    }
}

export function parseObjectId(
    val: string | ObjectId,
    defaultValue?: ObjectId
): ObjectId {
    try {
        if (val instanceof ObjectId) {
            return val;
        } else if (ObjectId.isValid(val)) {
            return new ObjectId(val);
        } else {
            throw new Error('Invalid ObjectId, passed:' + JSON.stringify(val));
        }
    } catch (e) {
        return defaultValue || null;
    }
}
